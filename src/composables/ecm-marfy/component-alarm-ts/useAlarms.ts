import { ref, onMounted, computed } from 'vue';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import { getAlarmList } from '@/services/ecm-marfy/dashboard/dashboardService';
import {deleteAlarm, getOneAlarmHistory} from '@/services/ecm-marfy/alarms/alarmService';
import { useAlarmStore } from '@/stores/ecm-marfy/alarms/useAlarmStore';

interface AlarmIcon {
  icon: string;
  action: string;
}

export class AlarmModel {
  alarmId: number;
  message: string;
  status: string;
  icons: AlarmIcon[];

  constructor(
    alarmId: number,
    message: string,
    status: string,
    icons: AlarmIcon[] = []
  ) {
    this.alarmId = alarmId;
    this.message = message;
    this.status = status;
    this.icons = icons;
  }
}

export function useAlarms() {
  const alarmStore = useAlarmStore();
  const alarms = ref<AlarmModel[]>([]);
  const selectedStore = useSelectedItemStore();
  const selectedAlarm = ref<AlarmModel | null>(null);
  const showEditDialog = ref(false);

  async function fetchAlarms() {
    const orgId = selectedStore.selectedOrgId;
    const nodeId = selectedStore.selectedNodeId;

    if (nodeId === null || orgId === null) return;

    try {
      const rawAlarms = await getAlarmList(nodeId, orgId);
      console.log(rawAlarms);
      alarms.value = rawAlarms.data.map((alarm: any) => {
        const id = alarm.id;
        const message = alarm.name || alarm.message || 'Neznámý alarm';
        const status = alarm.status || 'ok';

        const icons: AlarmIcon[] =
          status.toLowerCase?.() === 'alarm'
            ? [{ icon: 'check_circle', action: 'acknowledge' }]
            : [
                { icon: 'schedule', action: 'schedule' },
                { icon: 'edit', action: 'edit' },
                { icon: 'check_circle', action: 'acknowledge' },
                { icon: 'delete', action: 'delete' }
              ];

        return new AlarmModel(id, message, status, icons);
      });
    } catch (error) {
      console.error('Failed to load alarms:', error);
    }
  }

  async function handleIconClick(action: string, alarm: AlarmModel) {
    switch (action) {
      case 'schedule':
        const history = await getOneAlarmHistory(alarm.alarmId);
        console.log('Alarm History:', history);
        break;
      case 'edit':
        selectedAlarm.value = { ...alarm };
        showEditDialog.value = true;
        break;
      case 'acknowledge':
        console.log('Acknowledge clicked for', alarm);
        break;
      case 'delete':
        await deleteAlarm(alarm.alarmId);
        alarmStore.fetchAlarms();
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  onMounted(fetchAlarms);

  return {
    alarms,
    fetchAlarms,
    handleIconClick,
    selectedAlarm,
    showEditDialog,
  };
}
