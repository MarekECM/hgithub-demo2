import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData';

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    devices: ref<DeviceData[]>([]),
    lastFetched: ref<number | null>(null),
  }),
  actions: {
    setDevices(data: DeviceData[]) {
      this.devices = data;
      this.lastFetched = Date.now();
    },
    clearDevices() {
      this.devices = [];
      this.lastFetched = null;
    },
  },
});
