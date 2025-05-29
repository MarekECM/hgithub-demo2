import { ref, computed } from 'vue';
import { useAlarmStore } from '@/stores/ecm-marfy/alarms/useAlarmStore';
import { deleteAlarm, getOneAlarmHistory } from '@/services/ecm-marfy/alarms/alarmService';

interface AlarmIcon {
  icon: string;
  action: string;
}

export class AlarmModel {
  alarmId: number;
  message: string;
  status: string;
  icons: AlarmIcon[];

  constructor(alarmId: number, message: string, status: string, icons: AlarmIcon[] = []) {
    this.alarmId = alarmId;
    this.message = message;
    this.status = status;
    this.icons = icons;
  }
}

export function useAlarms() {
  const alarmStore = useAlarmStore();
  const alarms = computed(() => alarmStore.alarms); // Použij alarmy ze store

  async function handleIconClick(action: string, alarm: AlarmModel) {
    switch (action) {
      case 'schedule':
        const history = await getOneAlarmHistory(alarm.alarmId);
        console.log('Alarm History:', history);
        break;
      case 'edit':
        console.log('Edit clicked for', alarm);
        break;
      case 'acknowledge':
        console.log('Acknowledge clicked for', alarm);
        break;
      case 'delete':
        await deleteAlarm(alarm.alarmId);
        alarmStore.loadAlarms(); // Aktualizuj po smazání
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  return {
    alarms,
    handleIconClick,
  };
}