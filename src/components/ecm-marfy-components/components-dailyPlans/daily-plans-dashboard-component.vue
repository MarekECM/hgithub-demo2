<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { DayPlanModel } from '@/interfaces/DayPlan/DayPlanModel'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'

const dayPlans = ref<DayPlanModel[]>([])

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
    dayPlans.value = response.data.map((item: any) => ({
      dayPlanId: item.id,
      dayPlanName: item.name
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
