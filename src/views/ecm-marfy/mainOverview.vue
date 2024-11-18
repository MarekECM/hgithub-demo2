<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import Header from '@/components/ecm-marfy-components/marfy-layout/headerComponent.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/NavtreeMarfyComponent.vue'
import sectionBanner from '@/components/ecm-marfy-components/components-sectios/sectionBannerComponent.vue'
import productionSection from '@/components/ecm-marfy-components/components-sectios/productionSectionComponent.vue'
import consumptionSection from '@/components/ecm-marfy-components/components-sectios/consumptionSectionComponent.vue'
import resultSection from '@/components/ecm-marfy-components/components-sectios/resultSectionComponent.vue'
// import batteryDevice from '@/components/ecm-marfy-components/components-devices/batteryDevice.vue'
import batteryDevice from '@/components/ecm-marfy-components/components-devices/batteryDeviceComponent.vue'
import electricityMeter from '@/components/ecm-marfy-components/components-devices/electricitymeterComponent.vue'
import photovoltaicsDevice from '@/components/ecm-marfy-components/components-devices/photovoltaicsDeviceComponent.vue'


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
  <main :style="dynamicStyles" style="padding-top: 100px">
    <section class="mainContentContainer">
      <sectionBanner />
      <div class="balanceValueContainer">
        <productionSection />
        <consumptionSection />
        <resultSection />
      </div>
      <div class="activeDevicesContainer">
        <div class="titleDevices">vaše aktivní zařízení</div>
        <batteryDevice />
        <electricityMeter />
        <photovoltaicsDevice />
        <batteryDevice />
        <electricityMeter />
        <photovoltaicsDevice />
        <batteryDevice/>
        <electricityMeter />
        <photovoltaicsDevice />
      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>

<style setup lang="scss">
main {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  background-color: var(--body-backgroundColor);
  //  padding-top: 100px;
}

.balanceValueContainer {
  display: block;
  width: 100%;
  margin: 15px auto 0;
}

.activeDevicesContainer {
  position: relative;
  @extend .balanceValueContainer;
  margin: 0 auto;
}

.titleDevices {
  display: flex;
  width: 100%;
  max-width: 1330px;
  padding: 0 0 30px;
  margin: 0 auto;
  font-size: var(--titleSection);
  color: var(--ecm-title);
}
</style>
