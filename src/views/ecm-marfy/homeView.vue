<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'
import sectionBanner from '@/components/ecm-marfy-components/components-sectios/section-banner-component.vue'
import productionSection from '@/components/ecm-marfy-components/components-sectios/production-section-component.vue'
import consumptionSection from '@/components/ecm-marfy-components/components-sectios/consumption-section-component.vue'
import economicPerformanceComponent from '@/components/ecm-marfy-components/components-sectios/economic-performance-component.vue'
import batteryDevice from '@/components/ecm-marfy-components/components-devices/battery-device-component.vue'
import electricityMeter from '@/components/ecm-marfy-components/components-devices/electricitymeter-component.vue'
import photovoltaicsDevice from '@/components/ecm-marfy-components/components-devices/photovoltaics-device-component.vue'

//Použití store
const sidebarStore = useSidebarStore()

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
        <batteryDevice />
        <electricityMeter />
        <photovoltaicsDevice />
        <batteryDevice />
        <electricityMeter />
        <photovoltaicsDevice />
        <batteryDevice />
        <electricityMeter />
        <photovoltaicsDevice />
      </section>
    </div>
  </main>
  <NavtreeMarfy />
</template>
