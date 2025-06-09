<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/resize'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'
import alarmsTable from '@/components/ecm-marfy-components/components-alarms/alarms-table-component.vue'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'
//import {useAlarmStore} from "@/stores/ecm-marfy/alarms/useAlarmStore";
const store = useSelectedItemStore()


const sidebarStore = useSidebarStore()
//const showAlarmHistory = useAlarmStore().showAlarmHistory;
</script>

<template>
  <Header />
<main class="ecm-main" :style="sidebarStore.dynamicStyles">
  <section class="ecm-main__wrap">
    <div class="ecm-main__container-primary">
      <div class="ecm-main__container--secondary">
        <div class="ecm-main__title-devices">
          <span>{{ store.selectedItem }}</span>
          <div class="alarm-btn-container">
            <!-- @click="showAlarmHistory" -->
            <div class="alarm-btn-container__selection-alarms" >
              <span class="alarm-btn-container__icon-content">
                <span class="alarm-btn-container__icon material-icons">
                  notification_add
                </span>
              </span>
              <span class="alarm-btn-container__text">Přidat alarm</span>  
            </div>
            <div class="alarm-btn-container__selection-alarms">
              <span class="alarm-btn-container__icon-content">
                <span class="alarm-btn-container__icon material-icons">
                  format_list_bulleted
                </span>
              </span>
              <span class="alarm-btn-container__text">Zobrazit historii</span>  
            </div>
          </div>
        </div>
      </div>
      <alarmsTable />
    </div>
  </section>
</main>

  <NavtreeMarfy />
  
</template>
