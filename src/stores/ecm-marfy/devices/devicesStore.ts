import { defineStore } from 'pinia';
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData';

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    devices: [] as DeviceData[],
  }),
  actions: {
    setDevices(data: DeviceData[]) {
      this.devices = data;
    },
  },
});
