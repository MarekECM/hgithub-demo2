import { defineStore } from "pinia";
import { useSelectedItemStore } from "@/stores/ui/useSelectedItemStore";
import {
  getAlarmHistory,
  getNotificationTypes,
  getAlarmList
} from "@/services/ecm-marfy/alarms/alarmService";

export const useAlarmStore = defineStore("alarm", {
  state: () => ({
    alarmTypes: [] as any[],
    alarms: [] as any[],
    lastLoadedOrgId: null as number | null,
    lastLoadedNodeId: null as number | null,
    isLoading: false,
  }),

  getters: {
    alarmsCount: (state) => state.alarms.length,
    hasAlarms: (state) => state.alarms.length > 0,
  },

  actions: {
    async fetchAlarms() {
      const selectedStore = useSelectedItemStore();
      const orgId = selectedStore.selectedOrgId;
      const nodeId = selectedStore.selectedNodeId;

      if (!orgId || !nodeId) return;

      if (this.lastLoadedOrgId === orgId && this.lastLoadedNodeId === nodeId && this.alarms.length > 0) {
        console.log("Alarms already loaded for this organization and node");
        return;
      }

      this.isLoading = true;
      try {
        const response = await getAlarmList(nodeId, orgId); 
        const newAlarms = response.data;

        // Mapování alarmů do AlarmModel (převzato z useAlarms)
        this.alarms = newAlarms.map((alarm: any) => {
          const id = alarm.id;
          const message = alarm.name || alarm.message || 'Neznámý alarm';
          const status = alarm.status || 'ok';
          const icons =
            status.toLowerCase?.() === 'alarm'
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
        console.log("Alarms loaded:", this.alarms.length);
      } catch (err) {
        console.error("Failed to load alarms", err);
      } finally {
        this.isLoading = false;
      }
    },

    async showAlarmHistory() {
      const selectedStore = useSelectedItemStore();
      const orgId = selectedStore.selectedOrgId;
      if (!orgId) return;

      const history = await getAlarmHistory(orgId);
      console.log(history);
    },

    async fetchAlarmTypes() {
      if (this.alarmTypes.length > 0) return;

      try {
        const response = await getNotificationTypes();
        this.alarmTypes = response.data;
      } catch (err) {
        console.error("Failed to fetch alarm types", err);
      }
    },

    startFetchingAlarms() {
      // Spustí interval pro pravidelné načítání
      this.fetchAlarms(); // První načtení
      const intervalId = window.setInterval(() => {
        console.log("Intervalový fetchAlarms v", new Date().toLocaleTimeString());
        this.fetchAlarms();
      }, 30000);

      return intervalId;
    },

    stopFetchingAlarms(intervalId: number) {
      if (intervalId) clearInterval(intervalId);
    },

    resetAlarms() {
      this.alarms = [];
      this.lastLoadedOrgId = null;
      this.lastLoadedNodeId = null;
    },
  },
});