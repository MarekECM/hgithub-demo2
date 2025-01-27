<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import batteryDeviceDetail from '@/components/ecm-marfy-components/components-devices/detail-devices-componenet/battery-device-detail-component.vue'
import navtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'

//Použití store
const sidebarStore = useSidebarStore()
</script>

<template>
  <Header/>
  <main class="ecm-main" :style="sidebarStore.dynamicStyles">
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <batteryDeviceDetail />
      </div>
    </section>
  </main>
  <navtreeMarfy />
</template>
