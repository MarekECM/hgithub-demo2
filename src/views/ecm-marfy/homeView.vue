<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';
import { useDevicesStore } from '@/stores/ecm-marfy/devices/devicesStore';
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData';

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue';
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue';
import sectionBanner from '@/components/ecm-marfy-components/components-sectios/section-banner-component.vue';
import productionSection from '@/components/ecm-marfy-components/components-sectios/production-section-component.vue';
import consumptionSection from '@/components/ecm-marfy-components/components-sectios/consumption-section-component.vue';
import economicPerformanceComponent from '@/components/ecm-marfy-components/components-sectios/economic-performance-component.vue';
import deviceBox from '@/components/ecm-marfy-components/components-devices/DeviceBox.vue';

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
    <div class="ecm-main__wrap">
      <sectionBanner />
      <section class="ecm-main__container--primary">
        <productionSection />
        <consumptionSection />
        <economicPerformanceComponent />
      </section>
      <section class="ecm-main__container--secondary">
        <div class="ecm-main__titleDevices">Vaše aktivní zařízení</div>
        <template v-for="device in devicesStore.devices" :key="device.nodeID">
          <deviceBox :data="device" :variant="device.deviceType.name" />
        </template>
      </section>
    </div>
  </main>
  <NavtreeMarfy @dashboardData="handleDashboardData" />
</template>
