import { computed, ref, onMounted } from 'vue';
import { useAlarmStore } from '@/stores/ecm-marfy/alarms/useAlarmStore';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import { getOneAlarmHistory, deleteAlarm } from '@/services/ecm-marfy/alarms/alarmService';

export interface AlarmIcon {
  icon: string;
  action: string;
}

export interface AlarmModel {
  id: number | string;
  message: string;
  status: string;
  icons: AlarmIcon[];
}

export function useAlarms() {
  const alarmStore = useAlarmStore();
  const selectedStore = useSelectedItemStore();

  const alarms = computed(() => alarmStore.alarms);
  const selectedAlarm = ref<AlarmModel | null>(null);
  const showEditDialog = ref(false);

  function selectAlarm(id: number | string) {
    alarmStore.selectAlarm(id);
    selectedAlarm.value = alarms.value.find((alarm) => String(alarm.id) === String(id)) || null;
  }

  async function fetchAlarms() {
    const orgId = selectedStore.selectedOrgId;
    const nodeId = selectedStore.selectedNodeId;

    if (nodeId === null || orgId === null) return;

    try {
      await alarmStore.fetchAlarms();
    } catch (error) {
      console.error('Failed to load alarms:', error);
    }
  }

  async function handleIconClick(action: string, alarm: AlarmModel) {
    switch (action) {
      case 'schedule':
        try {
          const history = await getOneAlarmHistory(Number(alarm.id));
          console.log('Alarm History:', history);
        } catch (err) {
          console.error('Failed to get alarm history:', err);
        }
        break;

      case 'edit':
        selectedAlarm.value = { ...alarm };
        showEditDialog.value = true;
        break;

      case 'acknowledge':
        console.log('Acknowledge clicked for', alarm);
        break;

      case 'delete':
        try {
          await deleteAlarm(Number(alarm.id));
          await fetchAlarms();
        } catch (err) {
          console.error('Failed to delete alarm:', err);
        }
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
    selectAlarm,
  };
}