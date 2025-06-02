<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';
import { useDevicesStore } from '@/stores/ecm-marfy/devices/devicesStore';
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData';
import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue';
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue';
import deviceBox from '@/components/ecm-marfy-components/components-devices/DeviceBox.vue';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';

const store = useSelectedItemStore();
const sidebarStore = useSidebarStore();
const devicesStore = useDevicesStore();

function handleDashboardData(data: DeviceData[]) {
  devicesStore.setDevices(data);
  localStorage.setItem('devices', JSON.stringify(data));
}

onMounted(() => {
  const savedDevices = localStorage.getItem('devices');
  if (savedDevices) {
    devicesStore.setDevices(JSON.parse(savedDevices));
  }
});
</script>

<template>
  <Header />
  <main class="ecm-main" :style="sidebarStore.dynamicStyles">
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <div class="ecm-main__titleDevices">{{ store.selectedItem }}</div>
        <div v-if="devicesStore.devices.length">
          <template v-for="device in devicesStore.devices" :key="device.nodeID">
            <deviceBox :data="device" :variant="device.deviceType.name" />
          </template>
        </div>
        <div v-else>
          <div class="device-empty-info">Vyberte uzel pro zobrazení zařízení.</div>
        </div>
      </div>
    </section>
  </main>
  <NavtreeMarfy @dashboardData="handleDashboardData" />
</template>
