<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import type { DayPlanModel } from '@/interfaces/ecm-marfy/dailyPlans/DayPlanModel'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'
import DynamicFormDialog from '@/composables/global/DynamicFormDialog.vue'
import { useAddDayPlanForm } from '@/composables/ecm-marfy/component-day-plan-ts/useDayPlans'
import { useDayPlanStore } from '@/stores/ecm-marfy/daily-plans/dailyPlansStore'
import { useToast } from 'primevue/usetoast'


const store = useSelectedItemStore()
const dayPlanStore = useDayPlanStore()
const dayPlans = ref<DayPlanModel[]>(dayPlanStore.dayPlans)
const toast = useToast()
const editDayPlanForm = useAddDayPlanForm(toast)
const selectedDayPlan = ref<DayPlanModel | null>(null)

function edit(dayPlan: DayPlanModel) {
  selectedDayPlan.value = { ...dayPlan }
  editDayPlanForm.formData.value = { ...dayPlan }
  editDayPlanForm.openForm()
}

async function load(plan: DayPlanModel) {
  const array: number[] = [plan.Id]
  const queryString = array.map(id => `dayPlanIds=${id}`).join('&')
  const res = await axios.get(`${import.meta.env.VITE_API_URL}DayPlan/Load?${queryString}`)
  console.log(res.data)
}

async function fetchDayPlans(nodeId: number) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}DayPlan`, {
      params: { nodeId }
    })

    const res = await axios.get(`${import.meta.env.VITE_API_URL}Form/AddDayPlanFormModel`)
    editDayPlanForm.editSchema.value = res.data

    const fetchedPlans = response.data.map((item: any) => ({
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

    dayPlans.value = fetchedPlans
    dayPlanStore.setDayPlans(fetchedPlans)
  } catch (error: any) {
    console.error('Chyba při naĝítání denních plánů:', error)
    dayPlans.value = []
    dayPlanStore.clearDayPlans()
  }
}

onMounted(() => {
  if (!store.selectedNodeId && dayPlanStore.selectedNodeId) {
    store.selectedNodeId = dayPlanStore.selectedNodeId
  }

  if (typeof store.selectedNodeId === 'number' && !isNaN(store.selectedNodeId)) {
    fetchDayPlans(store.selectedNodeId)
  }
})

watch(() => store.selectedNodeId, (newNodeId) => {
  if (typeof newNodeId === 'number' && !isNaN(newNodeId)) {
    dayPlanStore.setSelectedNodeId(newNodeId)
    fetchDayPlans(newNodeId)
  } else {
    dayPlans.value = []
    dayPlanStore.clearDayPlans()
  }
})
</script>

<template>
  <div class="dailyPlans ecm-layout__container--default">
    <table class="alarm-detail__table">
      <thead class="alarm-detail__header">
        <tr class="alarm-detail__row">
          <th class="alarm-detail__cell alarm-detail__cell--name">NÝZEV</th>
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
      v-model:showDialog="editDayPlanForm.showEditDialog.value"
      :schema="editDayPlanForm.editSchema.value"
      :form-data="editDayPlanForm.formData"
      @submit="editDayPlanForm.handleSubmit"
      :dialog-name="editDayPlanForm.formName"
    />
  </div>
</template>