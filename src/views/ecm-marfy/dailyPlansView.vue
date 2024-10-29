<script setup lang="ts">

import { useSidebarStore } from '@/stores/resize'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import Header from '@/components/ecm-marfy-components/marfy-layout/header.vue'
import Navtree2_TEMP from '@/components/ecm-marfy-components/marfy-layout/Navtree2_TEMP.vue';
import dailyPlansDashboard from '@/components/ecm-marfy-components/components-dailyPlans/dailyPlansDashboard.vue';

//Použití store
const sidebarStore = useSidebarStore()

// Reaktivní proměnná pro sledování šířky okna
const windowWidth = ref(window.innerWidth);
// Funkce pro aktualizaci šířky okna
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Přidání event listeneru při načtení komponenty
onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

// Odebrání event listeneru při zničení komponenty
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

// Dynamický styl pro element
const dynamicStyles = computed(() => {
  if (windowWidth.value > 712) {
    // Pokud je šířka okna větší než 712px, použij styly
    return {
      marginLeft: `${sidebarStore.width}px`,
      width: `calc(100% - ${sidebarStore.width}px)`
    };
  } else {
    // Pokud je šířka okna menší nebo rovná 712px, odeber styly
    return {};
  }
});
</script>

<template>
    
    <Header/>
    <main :style="dynamicStyles">
        <section class="mainContentContainer" style="padding-top: 110px">
                <div class="activeDevicesContainer">
                        <div class="titleDevices DataPageTitle">
                                <span class="ecm_dalilyPlanTitle">Dalovice</span>
                        </div>
                        <dailyPlansDashboard/>
                </div>
        </section>
    </main>
     <Navtree2_TEMP/>

</template>

<style setup lang="scss">



</style>