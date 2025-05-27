<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import electricityMeterDeviceDetail from '@/components/ecm-marfy-components/components-devices/detail-devices-componenet/device-detail-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'

//Použití store
const sidebarStore = useSidebarStore()
</script>

<template>
  <Header />
  <main class="ecm-main" :style="sidebarStore.dynamicStyles">
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <electricityMeterDeviceDetail/>
      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>
