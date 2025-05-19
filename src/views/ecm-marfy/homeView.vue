<!-- <script setup lang="ts">
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/resize'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'
import sectionBanner from '@/components/ecm-marfy-components/components-sectios/section-banner-component.vue'
import productionSection from '@/components/ecm-marfy-components/components-sectios/production-section-component.vue'
import consumptionSection from '@/components/ecm-marfy-components/components-sectios/consumption-section-component.vue'
import economicPerformanceComponent from '@/components/ecm-marfy-components/components-sectios/economic-performance-component.vue'
// import batteryDevice from '@/components/ecm-marfy-components/components-devices/battery-device-component.vue'
// import electricityMeter from '@/components/ecm-marfy-components/components-devices/electricitymeter-component.vue'
// import photovoltaicsDevice from '@/components/ecm-marfy-components/components-devices/photovoltaics-device-component.vue'
import DeviceBox from '@/components/ecm-marfy-components/components-devices/DeviceBox.vue'

//Použití store
const sidebarStore = useSidebarStore()

const dashboardData = ref<any[]>([])

function handleDashboardData(data: any[]) {
  dashboardData.value = data
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
        <div v-if="dashboardData.length">
          <DeviceBox
            v-for="item in dashboardData"
            :key="item.nodeID"
            :data="item"
          />
        </div>
        <template v-else>
          <div class="device-empty-info">Vyberte uzel pro zobrazení zařízení.</div>
        </template>
      </section>
    </div>
  </main>
  <NavtreeMarfy @dashboardData="handleDashboardData" />
</template> -->
<!-- src/views/ecm-marfy/homeView.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { useSidebarStore } from '@/stores/resize';
import type { DeviceData } from '@/interfaces/deviceData';
import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue';
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue';
import sectionBanner from '@/components/ecm-marfy-components/components-sectios/section-banner-component.vue';
import productionSection from '@/components/ecm-marfy-components/components-sectios/production-section-component.vue';
import consumptionSection from '@/components/ecm-marfy-components/components-sectios/consumption-section-component.vue';
import economicPerformanceComponent from '@/components/ecm-marfy-components/components-sectios/economic-performance-component.vue';
import ElectricityMeter from '@/components/ecm-marfy-components/components-devices/electricitymeter-component.vue';
import Photovoltaic from '@/components/ecm-marfy-components/components-devices/photovoltaics-device-component.vue';
import Location from '@/components/ecm-marfy-components/components-devices/location-device-component.vue';

const sidebarStore = useSidebarStore();

const electricityMeters = ref<DeviceData[]>([]);
const photovoltaics = ref<DeviceData[]>([]);
const location = ref<DeviceData[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

function handleDashboardData(data: DeviceData[]) {
  electricityMeters.value = data.filter((item) => item.deviceType.name === 'Elektroměr');
  photovoltaics.value = data.filter((item) => item.deviceType.name === 'Fotovoltaika');
  location.value = data.filter((item) => item.deviceType.name === 'Lokalita');
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
        <div v-else-if="electricityMeters.length || photovoltaics.length || location.length"> 
          <template v-for="meter in electricityMeters" :key="meter.nodeID">
            <ElectricityMeter :data="meter" />
          </template>
          <template v-for="pv in photovoltaics" :key="pv.nodeID">
            <Photovoltaic :data="pv" />
          </template>
          <template v-for="loc in location" :key="loc.nodeID">
            <Location :data="loc" />
          </template>
            
        </div>
     
      </section>
    </div>
  </main>
  <NavtreeMarfy @dashboardData="handleDashboardData" />
</template>

