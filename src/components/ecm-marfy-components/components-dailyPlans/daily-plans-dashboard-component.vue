<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import type { DayPlanModel } from '@/interfaces/ecm-marfy/DayPlan/DayPlanModel'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'

const store = useSelectedItemStore()
const dayPlans = ref<DayPlanModel[]>([])

async function fetchDayPlans(nodeId: number) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}DayPlan`, {
      params: { nodeId }
    })
    dayPlans.value = response.data.map((item: any) => ({
      dayPlanId: item.id,
      dayPlanName: item.name
    }))

    localStorage.setItem('cachedDayPlans', JSON.stringify(dayPlans.value))
  } catch (error: any) {
    console.error('Chyba při načítání denních plánů:', error)
    dayPlans.value = []
    localStorage.removeItem('cachedDayPlans')
  }
}

onMounted(() => {
  if (!store.selectedNodeId) {
    const savedId = localStorage.getItem('selectedNodeId')
    if (savedId) {
      store.selectedNodeId = parseInt(savedId)
    }
  }

  const cachedPlans = localStorage.getItem('cachedDayPlans')
  if (cachedPlans) {
    try {
      dayPlans.value = JSON.parse(cachedPlans)
    } catch {
      dayPlans.value = []
    }
  }

  if (typeof store.selectedNodeId === 'number' && !isNaN(store.selectedNodeId)) {
    fetchDayPlans(store.selectedNodeId)
  }
})

watch(() => store.selectedNodeId, (newNodeId) => {
  if (typeof newNodeId === 'number' && !isNaN(newNodeId)) {
    localStorage.setItem('selectedNodeId', newNodeId.toString())
    fetchDayPlans(newNodeId)
  } else {
    dayPlans.value = []
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
        <tr v-for="plan in dayPlans" :key="plan.dayPlanId" class="alarm-detail__row">
          <td class="alarm-detail__cell alarm-detail__cell--message">
            {{ plan.dayPlanName }}
          </td>
          <td class="alarm-detail__cell alarm-detail__cell--actions">
            <span class="alarm-detail__icon material-icons"> edit </span>
            <span class="alarm-detail__icon material-icons"> delete </span>
            <span class="alarm-detail__icon material-icons"> published_with_changes </span>
            <span class="alarm-detail__icon material-icons"> save </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
