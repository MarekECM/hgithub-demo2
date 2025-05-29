<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useAlarmStore } from '@/stores/ecm-marfy/alarms/useAlarmStore';
import { useAlarmWatcher } from '@/composables/ecm-marfy/component-alarm-ts/useAlarmWatcher';

const alarmStore = useAlarmStore();
useAlarmWatcher(); // Aktivuj sledování změn organizace/uzlu

let intervalId: number | null = null;

onMounted(() => {
  intervalId = alarmStore.startFetchingAlarms();
});

onUnmounted(() => {
  if (intervalId) alarmStore.stopFetchingAlarms(intervalId);
});
</script>


<template>
    <div class="ecm-layout ecm-layout__default">
      <RouterView/>
      <ConfirmDialog>
      </ConfirmDialog>
      <Toast />
    </div>     
</template>

