<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import com_header from '@/components/ecm-community-components/community-layout/com_headerComponent.vue';
import com_NavTree from '@/components/ecm-community-components/community-layout/com_navTreeComponent.vue';
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

       <com_header/>
        <main :style="dynamicStyles">
            <section class="mainContentContainer" style="padding-top: 110px">
                <div class="activeDevicesContainer">
                     <div class="titleDevices DataPageTitle">
                        <span class="ecm_dailyPlanTitle">Správa členů</span>
                     </div>
                </div>
            </section>   
        </main>
        <com_NavTree/>

</template>

<style setup lang="scss">

        .mainContentContainer {
                min-height: calc(100vh - 300px);
        }

        .detailDevicesContainerTest {
                max-width: 1300px;
                width: 100%;
                min-height: 89vh;
              //  margin: 30px auto;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px 5px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 50px;
                background-color: red;
        }

</style>