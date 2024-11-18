<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import Header from '@/components/ecm-marfy-components/marfy-layout/headerComponent.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/NavtreeMarfyComponent.vue'
import reportsTable from '@/components/ecm-marfy-components/components-reports/reportsTableComponent.vue'

//Použití store
const sidebarStore = useSidebarStore()

// Reaktivní proměnná pro sledování šířky okna
const windowWidth = ref(window.innerWidth)
// Funkce pro aktualizaci šířky okna
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Přidání event listeneru při načtení komponenty
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

// Odebrání event listeneru při zničení komponenty
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

// Dynamický styl pro element
const dynamicStyles = computed(() => {
  if (windowWidth.value > 712) {
    // Pokud je šířka okna větší než 712px, použij styly
    return {
      marginLeft: `${sidebarStore.width}px`,
      width: `calc(100% - ${sidebarStore.width}px)`
    }
  } else {
    // Pokud je šířka okna menší nebo rovná 712px, odeber styly
    return {}
  }
})
</script>

<template>
  <Header />
  <main :style="dynamicStyles">
    <section class="mainContentContainer" style="padding-top: 110px">
      <div class="activeDevicesContainer">
        <div class="titleDevices DataPageTitle">
          <span class="ecm_alarmsTitle">Výkazy</span>
          <div class="ecm_selectionAlarms">
            <span class="iconContent"
              ><span class="material-icons testIcon2" style="font-size: 19px"
                >format_list_bulleted</span
              ></span
            >
            <span class="ecm_selectionPeriodsText">Zobrazit historii</span>
          </div>
        </div>
        <reportsTable />
      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>

<style setup lang="scss"></style>
