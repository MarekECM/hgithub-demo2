<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'
import { ref } from 'vue'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'
import DeviceBox from '@/components/ecm-marfy-components/components-devices/DeviceBox.vue'
import { useSelectedItemStore } from '@/stores/useSelectedItemStore'
const store = useSelectedItemStore()
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
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <div class="ecm-main__titleDevices">{{ store.selectedItem }}</div>
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
      </div>
    </section>
  </main>
  <NavtreeMarfy @dashboardData="handleDashboardData" />
</template>
