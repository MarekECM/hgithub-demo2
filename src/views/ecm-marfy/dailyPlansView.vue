<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/resize'
import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue'
import dailyPlansDashboard from '@/components/ecm-marfy-components/components-dailyPlans/daily-plans-dashboard-component.vue'
import DynamicFormDialog from "@/composables/global/DynamicFormDialog.vue";
import {useDayPlans} from "@/composables/ecm-marfy/component-day-plan-ts/useDayPlans";
import {onMounted, ref} from "vue";
import axios from "axios";
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'
import {useToast} from "primevue/usetoast";
import type {FieldSchema} from "@/interfaces/DynamicFormField";
import {normalizeEmptyStrings} from "@/composables/global/DynamicForm/dynamicFormFunctions";
const store = useSelectedItemStore()

//Použití store
const sidebarStore = useSidebarStore()
const {
  addDayPlanClick,showEditDialog } = useDayPlans();

const editSchema = ref<FieldSchema[]>([]);
const formName = ref('Přidat denní plán');
const toast = useToast();

async function addDayPlan(){
  await addDayPlanClick(editSchema);
}
async function handleSubmit(dayPlanData: Record<string, any>) {
  const normalizedData = normalizeEmptyStrings(dayPlanData);
  normalizedData.nodeId = store.selectedNodeId;
  console.log('Trying to add dayPlan:', normalizedData);
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}DayPlan/AddDayPlan`, normalizedData,{headers: {
        'Content-Type': 'application/json',
      },});
      showEditDialog.value = false;
  }
  catch(e : any){
    console.log("TEST");
    toast.add({ severity: 'error', summary: 'Error', detail: `Denní plán nebyl vytvořen : ${e.message}`, life: 3000 });
  }
}
</script>

<template>
  <Header />
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
              <span class="ecm_iconBtnTextContent" @click="addDayPlan">Přidat denní plán</span>
            </div>
          </div>
        </div>
        <dailyPlansDashboard />
      </div>
    </section>
  </main>
  <NavtreeMarfy />
  <DynamicFormDialog
      v-model:showDialog="showEditDialog"
      :schema="editSchema"
      @submit="handleSubmit"
      :dialog-name="formName"
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
