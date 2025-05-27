<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/resize'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'

//Použití store
const sidebarStore = useSidebarStore()
</script>

<template>
  <Header />
  <main class="ecm-main" :style="sidebarStore.dynamicStyles">
    <section class="ecm-main__wrap"></section>
  </main>
  <NavtreeMarfy />
</template>
