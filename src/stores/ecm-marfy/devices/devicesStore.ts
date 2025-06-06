import { defineStore } from 'pinia';
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData';

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    devices: [] as DeviceData[],
    lastFetched: null as number | null,
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

