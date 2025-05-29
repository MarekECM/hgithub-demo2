import { watch } from 'vue';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import { useAlarmStore } from '@/stores/ecm-marfy/alarms/useAlarmStore';

export function useAlarmWatcher() {
  const selectedItemStore = useSelectedItemStore();
  const alarmStore = useAlarmStore();

  watch(
    () => selectedItemStore.selectedOrgId,
    (newOrgId, oldOrgId) => {
      if (newOrgId !== oldOrgId) {
        console.log('Organizace změněna:', oldOrgId, '→', newOrgId);
        alarmStore.resetAlarms();
        alarmStore.fetchAlarms();
      }
    }
  );

  watch(
    () => selectedItemStore.selectedNodeId,
    (newNodeId, oldNodeId) => {
      if (newNodeId !== oldNodeId) {
        console.log('Uzel změněn:', oldNodeId, '→', newNodeId);
        alarmStore.resetAlarms();
        alarmStore.fetchAlarms();
      }
    }
  );
}
