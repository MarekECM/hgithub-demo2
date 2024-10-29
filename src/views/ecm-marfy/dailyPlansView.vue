<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import Header from '@/components/ecm-marfy-components/marfy-layout/header.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/NavtreeMarfy.vue'
import dailyPlansDashboard from '@/components/ecm-marfy-components/components-dailyPlans/dailyPlansDashboard.vue'

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
          <span class="ecm_dailyPlanTitle">Dalovice</span>
          <div class="ecm_btnContainer">
            <div class="ecm_iconBtn">
              <span class="iconContent"
                ><span class="material-icons ecm_powerIcon" style="font-size: 19px"
                  >power_settings_new</span
                ></span
              >
              <span class="ecm_iconBtnTextContent">Ztlupmit všechny plány</span>
            </div>
            <div class="ecm_iconBtn">
              <span class="iconContent"
                ><span class="material-icons ecm_checkIcon" style="font-size: 19px"
                  >check</span
                ></span
              >
              <span class="ecm_iconBtnTextContent">Ztlupmit všechny plány</span>
            </div>
          </div>
        </div>
        <dailyPlansDashboard />
      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>

<style setup lang="scss">
.ecm_btnContainer {
  display: flex;
}

.ecm_iconBtn {
  width: 100%;
  max-width: 230px;
  font-size: 16px;
  background-color: var(--btnBgDailyPlans);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid var(--btnBorderDailyPlans);
  height: 40px;
  cursor: pointer;
  margin-left: 15px;
}

.iconContent {
  padding: 0 0 0 10px;
}

.ecm_powerIcon {
  color: var(--colorIconDpPower);
}

.ecm_checkIcon {
  color: var(--colorIconDpCheck);
}

.ecm_iconBtnTextContent {
  margin: 0px 10px;
}
</style>
