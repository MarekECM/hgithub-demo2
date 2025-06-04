import { useDevicesStore } from '@/stores/ecm-marfy/devices/devicesStore';
import { GetDevices } from '@/services/ecm-marfy/dashboard/dashboardService';

export async function fetchAndStoreDevices(nodeId: number, orgId: number) {
  const devicesStore = useDevicesStore();
  const cacheDuration = 5 * 60 * 1000; 

  if (
    devicesStore.devices.length &&
    devicesStore.lastFetched &&
    Date.now() - devicesStore.lastFetched < cacheDuration
  ) {
    return devicesStore.devices;
  }

  const response = await GetDevices(nodeId, orgId);
  const data = response.data;

  devicesStore.setDevices(data);
  return data;
}
