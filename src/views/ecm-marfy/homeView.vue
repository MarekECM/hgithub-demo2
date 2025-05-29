
<script setup lang="ts">
import { ref } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData';
import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue';
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue';
import sectionBanner from '@/components/ecm-marfy-components/components-sectios/section-banner-component.vue';
import productionSection from '@/components/ecm-marfy-components/components-sectios/production-section-component.vue';
import consumptionSection from '@/components/ecm-marfy-components/components-sectios/consumption-section-component.vue';
import economicPerformanceComponent from '@/components/ecm-marfy-components/components-sectios/economic-performance-component.vue';
//import ElectricityMeter from '@/components/ecm-marfy-components/components-devices/electricitymeter-component.vue';
//import Photovoltaic from '@/components/ecm-marfy-components/components-devices/photovoltaics-device-component.vue';
//import Location from '@/components/ecm-marfy-components/components-devices/location-device-component.vue';
import deviceBox from '@/components/ecm-marfy-components/components-devices/DeviceBox.vue';

const sidebarStore = useSidebarStore();

// const electricityMeters = ref<DeviceData[]>([]);
// const photovoltaics = ref<DeviceData[]>([]);
// const location = ref<DeviceData[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const devices = ref<DeviceData[]>([]);

function handleDashboardData(data: DeviceData[]) {
  // electricityMeters.value = data.filter((item) => item.deviceType.name === 'Elektroměr');
  // photovoltaics.value = data.filter((item) => item.deviceType.name === 'Fotovoltaika');
  // location.value = data.filter((item) => item.deviceType.name === 'Lokalita');
    devices.value = data; // Uložíš všechna zařízení
}
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
        <div v-if="loading">Načítání...</div>
        <div v-else-if="error">Chyba: {{ error }}</div>
        <!-- <div v-else-if="electricityMeters.length || photovoltaics.length || location.length"> 
          <template v-for="meter in electricityMeters" :key="meter.nodeID">
            <ElectricityMeter :data="meter" />
          </template>
          <template v-for="pv in photovoltaics" :key="pv.nodeID">
            <Photovoltaic :data="pv" />
          </template>
          <template v-for="loc in location" :key="loc.nodeID">
            <Location :data="loc" />
          </template> 
             
        </div> -->
        <template v-for="device in devices" :key="device.nodeID">
          <deviceBox :data="device" :variant="device.deviceType.name" />
        </template>
      </section>
    </div>
  </main>
  <NavtreeMarfy @dashboardData="handleDashboardData" />
</template>



