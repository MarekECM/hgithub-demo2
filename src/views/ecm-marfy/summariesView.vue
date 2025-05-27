<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/resize'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'
import totalSupplyGrid from '@/components/ecm-marfy-components/components-summaries/total-supply-grid-component.vue'
import totalSupplyBattery from '@/components/ecm-marfy-components/components-summaries/total-supply-battery-component.vue'
import totalConsumptionGrid from '@/components/ecm-marfy-components/components-summaries/total-consumption-grid-component.vue'
import totalConsumptionEnergy from '@/components/ecm-marfy-components/components-summaries/total-consumption-energy-component.vue'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'
const store = useSelectedItemStore()

//Použití store
const sidebarStore = useSidebarStore()
</script>

<template>
  <Header />
  <main class="ecm-main" :style="sidebarStore.dynamicStyles">
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <div class="ecm-main__titleDevices">
          <span>{{ store.selectedItem }}</span>
          <div class="summaries-selection-periods">
            <div class="summaries-selection-periods__icon">
              <span class="material-icons summaries-selection-periods__icon-calendar"
                >calendar_today</span
              >
            </div>
            <span class="summaries-selection-periods__text">včera</span>
            <div class="summaries-selection-periods__icon">
              <span class="material-icons summaries-selection-periods__icon-arrow"
                >keyboard_arrow_down</span
              >
            </div>
          </div>
        </div>
        <totalSupplyGrid />
        <totalSupplyBattery />
        <totalConsumptionGrid />
        <totalConsumptionEnergy />
        <totalSupplyGrid />
        <totalSupplyGrid />
        <totalSupplyBattery />
        <totalConsumptionGrid />
      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>

<style setup lang="scss">
// .DataPageTitle {
//   display: flex;
//   padding-top: 25px;
//   font-size: 35px;
//   color: white;
//   justify-content: space-between;
// }

// .ecm_selectionPeriods {
//   width: 150px;
//   height: 35px;
//   background-color: var(--selectionPeriodsBg);
//   border-radius: 5px;
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 10px;
//   cursor: pointer;
//   transition: var(--transtion3);

//   &:hover {
//     background-color: white;
//     color: var(--selectionPeriodsBg);
//   }

//   &:hover .testIcon3 {
//     color: var(--selectionPeriodsBg);
//   }
// }
</style>
