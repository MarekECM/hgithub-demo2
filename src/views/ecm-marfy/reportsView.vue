<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'
import reportsTable from '@/components/ecm-marfy-components/components-reports/reports-table-component.vue'

//Použití store
const sidebarStore = useSidebarStore()
</script>

<template>
  <Header />
  <main class="ecm-main" :style="sidebarStore.dynamicStyles">
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <div class="ecm-main__titleDevices">
          <span>Výkazy</span>
          <div class="reports-btn-container">
            <div class="reports-btn-container__selection-reportss">
              <span class="reports-btn-container__icon-content">
                <span class="reports-btn-container__icon material-icons">
                  format_list_bulleted
                </span>
              </span>
              <span class="reports-btn-container__text">Zobrazit historii</span>
            </div>
          </div>
        </div>
        <reportsTable />
      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>
