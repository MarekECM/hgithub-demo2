<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { DayPlanModel } from '@/interfaces/DayPlan/DayPlanModel'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'
import DynamicFormDialog from "@/composables/global/DynamicFormDialog.vue";
import {useAlarms} from "@/composables/ecm-marfy/component-alarm-ts/useAlarms";
import {useDayPlans} from "@/composables/ecm-marfy/component-day-plan-ts/useDayPlans";

const dayPlans = ref<DayPlanModel[]>([])

const {selectedDayPlan,
  showEditDialog } = useDayPlans();
const editSchema = ref([]);
const formName = ref("Upravit denní plán");
const formData = ref<Record<string, any>>({});
function handleSubmit(updatedData: Record<string, any>) {
  console.log('Updated dayPlan:', updatedData);
  showEditDialog.value = false;
}
function edit(dayPlan: DayPlanModel){
  selectedDayPlan.value = { ...dayPlan };
  formData.value = {
    Id: dayPlan.Id,
    Name: dayPlan.Name,
    NodeId: dayPlan.NodeId,
    UnitId: dayPlan.UnitId,
    DeviceId: dayPlan.DeviceId,
    DayPlanTypeId: dayPlan.DayPlanTypeId,
    MinMaxVariable: dayPlan.MinMaxVariable,
    MinValue: dayPlan.MinValue,
    MaxValue: dayPlan.MaxValue,
    VariableMin: dayPlan.VariableMin,
    VariableMax: dayPlan.VariableMax,
    VariableTimeId: dayPlan.VariableTimeId,
    VariableValueId: dayPlan.VariableValueId,
    VariableAttenuationId: dayPlan.VariableAttenuationId,
    VariableAttenuationValueId: dayPlan.VariableAttenuationValueId,
  };
  showEditDialog.value = true;
}

async function load(plan: DayPlanModel){
  const array : number[] = [plan.Id];
  console.log('array:', array);
  console.log('load:', plan);
  const queryString = array.map(id => `dayPlanIds=${id}`).join('&');
  const res = await axios.get(`${import.meta.env.VITE_API_URL}DayPlan/Load?${queryString}`);
  console.log(res.data);
}

onMounted(async () => {
  try {
    const store = useSelectedItemStore()
    const nodeId = store.selectedNodeId
    console.log('nodeId:', nodeId)

    if (!nodeId) {
      console.warn('Nebyl nalezen nodeId – načítání denních plánů se přeskočí')
      return
    }
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}DayPlan`, {
      params: { nodeId }
    })
    console.log('API response:', response.data)
    const res = await axios.get(`${import.meta.env.VITE_API_URL}Form/AddDayPlanFormModel`);
    editSchema.value = res.data;
    dayPlans.value = response.data.map((item: any) => ({
      Id: item.id,
      Name: item.name,
      NodeId: item.nodeId,
      UnitId: item.unitId,
      DeviceId: item.deviceId,
      DayPlanTypeId: item.dayPlanTypeId,
      MinValue: item.minValue,
      MaxValue: item.maxValue,
      MinMaxVariable: item.minMaxVariable,
      VariableMin: item.variableMin,
      VariableMax: item.variableMax,
      VariableTimeId: item.variableTimeId,
      VariableValueId: item.variableValueId,
      VariableAttenuationId: item.variableAttenuationId,
      VariableAttenuationValueId: item.variableAttenuationValueId,
      
    }))
  } catch (error: any) {
    console.error('Chyba při načítání denních plánů:', error)
  }
})
</script>

<template>
  <div class="dailyPlans ecm-layout__container--default">
    <table class="alarm-detail__table">
      <thead class="alarm-detail__header">
        <tr class="alarm-detail__row">
          <th class="alarm-detail__cell alarm-detail__cell--name">NÁZEV</th>
          <th class="alarm-detail__cell alarm-detail__cell--actions">AKCE</th>
        </tr>
      </thead>
      <tbody class="alarm-detail__body">
        <tr v-for="plan in dayPlans" :key="plan.Id" class="alarm-detail__row">
          <td class="alarm-detail__cell alarm-detail__cell--message">
            {{ plan.Name }}
          </td>
          <td class="alarm-detail__cell alarm-detail__cell--actions">
            <span class="alarm-detail__icon material-icons" @click="edit(plan)"> edit </span>
            <span class="alarm-detail__icon material-icons"> delete </span>
            <span class="alarm-detail__icon material-icons" @click="load(plan)"> published_with_changes </span>
            <span class="alarm-detail__icon material-icons"> save </span>
          </td>
        </tr>
      </tbody>
    </table>
    <DynamicFormDialog
        v-if="selectedDayPlan"
        v-model:showDialog="showEditDialog"
        :schema="editSchema"
        :form-data="formData"
        @submit="handleSubmit"
        :dialog-name="formName"
    />
  </div>
</template>
