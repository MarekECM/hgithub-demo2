<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import Header from '@/components/ecm-marfy-components/marfy-layout/header.vue'
import Navtree2_TEMP from '@/components/ecm-marfy-components/marfy-layout/Navtree2_TEMP.vue';
import totalSupplyGrid from '@/components/ecm-marfy-components/componenets-summaries/totalSupplyGrid.vue';
import totalSupplyBattery from '@/components/ecm-marfy-components/componenets-summaries/totalSupplyBattery.vue';
import totalConsumptionGrid from '@/components/ecm-marfy-components/componenets-summaries/totalConsumptionGrid.vue';
import totalConsumptionEnergy from '@/components/ecm-marfy-components/componenets-summaries/totalConsumptionEnergy.vue';
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
          <span class="ecm_summariesTitle">Dalovice</span>
          <div class="ecm_selectionPeriods"> 
            <span class="iconContent"><span class="material-icons testIcon3" style="font-size: 19px;">calendar_today</span></span>
            <span class="ecm_selectionPeriodsText">včera</span>
            <span class="iconContent"><span class="material-icons testIcon3" style="font-size: 19px;">keyboard_arrow_down</span></span>
          </div>
        </div>
        <totalSupplyGrid/>
        <totalSupplyBattery/>
        <totalConsumptionGrid/>
        <totalConsumptionEnergy/>
        <totalSupplyGrid/>
        <totalSupplyGrid/>
        <totalSupplyBattery/>
        <totalConsumptionGrid/>
      </div>
    </section>
  </main>
  <Navtree2_TEMP />


</template>

<style setup lang="scss">

.DataPageTitle {
  display: flex;
  padding-top: 25px;
  font-size: 35px;
  color: white;
  justify-content: space-between;
}

.ecm_selectionPeriods {
  width: 150px;
  height: 35px;
  background-color: var(--selectionPeriodsBg);
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  transition: var(--transtion3);

  &:hover {
    background-color: white;
    color: var(--selectionPeriodsBg);
  }

  &:hover .testIcon3 {
    color: var(--selectionPeriodsBg);
  }


}



</style>