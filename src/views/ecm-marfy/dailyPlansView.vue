<script setup lang="ts">
import {useSidebarStore} from '@/stores/ui/resize'
import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'
import dailyPlansDashboard
  from '@/components/ecm-marfy-components/components-dailyPlans/daily-plans-dashboard-component.vue'
import DynamicFormDialog from "@/composables/global/DynamicFormDialog.vue";
import {useAddDayPlanForm} from "@/composables/ecm-marfy/component-day-plan-ts/useDayPlans";
import {useSelectedItemStore} from '@/stores/ui/useSelectedItemStore'
import {useToast} from "primevue/usetoast";

const store = useSelectedItemStore()
const toast = useToast();
const addDayPlanForm = useAddDayPlanForm(toast);
//Použití store
const sidebarStore = useSidebarStore()
</script>

<template>
  <Header/>
  <main class="ecm-main" :style="sidebarStore.dynamicStyles">
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <div class="ecm-main__titleDevices">
          <span>{{ store.selectedItem }}</span>
          <div class="ecm_btnContainer">
            <div class="ecm_iconBtn">
              <span class="iconContent">
                <span class="material-icons ecm_powerIcon" style="font-size: 19px">power_settings_new</span>
              </span>
              <span class="ecm_iconBtnTextContent">Ztlumit všechny plány</span>
            </div>
            <div class="ecm_iconBtn">
              <span class="iconContent">
                <span class="material-icons ecm_checkIcon" style="font-size: 19px">check</span>
              </span>
              <span class="ecm_iconBtnTextContent">Aktivovat všechny plány</span>
            </div>
            <div class="ecm_iconBtn">
              <span class="iconContent">
                 <span class="material-icons ecm_powerIcon" style="font-size: 19px">event</span>
              </span>
              <span class="ecm_iconBtnTextContent" @click="addDayPlanForm.openForm()">Přidat denní plán</span>
            </div>
          </div>
        </div>
        <dailyPlansDashboard/>
      </div>
    </section>
  </main>
  <NavtreeMarfy/>
  <DynamicFormDialog
      v-model:showDialog="addDayPlanForm.showEditDialog.value"
      :schema="addDayPlanForm.editSchema.value"
      @submit="addDayPlanForm.handleSubmit"
      :dialog-name="addDayPlanForm.formName"
  />
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
  white-space: nowrap;
}
</style>
