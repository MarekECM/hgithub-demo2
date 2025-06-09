import { defineStore } from 'pinia';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import {
  getAlarmHistory,
  getNotificationTypes,
  getAlarmList,
} from '@/services/ecm-marfy/alarms/alarmService';

export interface AlarmModel {
  id: number | string;
  message: string;
  status: string;
  icons: { icon: string; action: string }[];
}

export const useAlarmStore = defineStore('alarmStore', {
  state: () => ({
    alarms: [] as AlarmModel[],
    alarmTypes: [] as any[],
    selectedAlarmId: null as string | null,
    showAlarmHistory: false,
    isLoading: false,
    lastLoadedOrgId: null as number | null,
    lastLoadedNodeId: null as number | null,
  }),

  getters: {
    alarmsCount: (state) => state.alarms.length,
    hasAlarms: (state) => state.alarms.length > 0,
    selectedAlarm: (state) =>
      state.alarms.find((alarm) => String(alarm.id) === state.selectedAlarmId) || null,
  },

  actions: {
    async fetchAlarms() {
      const selectedStore = useSelectedItemStore();
      const orgId = selectedStore.selectedOrgId;
      const nodeId = selectedStore.selectedNodeId;

      if (!orgId || !nodeId) return;

      // 🟡 Zkontroluj, zda už nejsou data načtena, pro optimalizaci volání API
      if (
        this.lastLoadedOrgId === orgId &&
        this.lastLoadedNodeId === nodeId &&
        this.alarms.length > 0
      ) {
        console.log('Alarms already loaded for this org/node.');
        return;
      }

      this.isLoading = true;
      try {
        const response = await getAlarmList(nodeId, orgId);
        const newAlarms = response.data;

        // 🟢 FIX: kontrola, že `status` není null nebo undefined
        this.alarms = newAlarms.map((alarm: any) => {
          const id = alarm.id;
          const message = alarm.name || alarm.message || 'Neznámý alarm';
          const status = alarm.status?.toLowerCase?.() || 'ok';

          const icons =
            status === 'alarm'
              ? [{ icon: 'check_circle', action: 'acknowledge' }]
              : [
                  { icon: 'schedule', action: 'schedule' },
                  { icon: 'edit', action: 'edit' },
                  { icon: 'check_circle', action: 'acknowledge' },
                  { icon: 'delete', action: 'delete' },
                ];

          return { id, message, status, icons };
        });

        this.lastLoadedOrgId = orgId;
        this.lastLoadedNodeId = nodeId;
        console.log('Alarms loaded:', this.alarms.length);
      } catch (err) {
        console.error('Failed to load alarms', err);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAlarmTypes() {
      if (this.alarmTypes.length > 0) return;

      try {
        const response = await getNotificationTypes();
        this.alarmTypes = response.data;
      } catch (err) {
        console.error('Failed to fetch alarm types', err);
      }
    },

    async showAlarmHistoryAction() {
      const selectedStore = useSelectedItemStore();
      const orgId = selectedStore.selectedOrgId;

      if (!orgId) return;

      try {
        const history = await getAlarmHistory(orgId);
        console.log('Alarm history:', history);
      } catch (err) {
        console.error('Failed to fetch alarm history', err);
      }
    },

    startFetchingAlarms() {
      this.fetchAlarms();
      const intervalId = window.setInterval(() => {
        console.log('Interval fetch at', new Date().toLocaleTimeString());
        this.fetchAlarms();
      }, 30000);

      return intervalId;
    },

    stopFetchingAlarms(intervalId: number) {
      if (intervalId) clearInterval(intervalId);
    },

    selectAlarm(id: number | string) {
      this.selectedAlarmId = String(id);
    },

    clearSelectedAlarm() {
      this.selectedAlarmId = null;
    },

    resetAlarms() {
      this.alarms = [];
      this.lastLoadedOrgId = null;
      this.lastLoadedNodeId = null;
      this.selectedAlarmId = null;
    },
  },
});
