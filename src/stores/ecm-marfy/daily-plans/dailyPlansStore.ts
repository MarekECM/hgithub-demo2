import { defineStore } from 'pinia'
import type { DayPlanModel } from '@/interfaces/ecm-marfy/dailyPlans/DayPlanModel'

export const useDayPlanStore = defineStore('dayPlan', {
  state: () => ({
    selectedNodeId: null as number | null,
    dayPlans: [] as DayPlanModel[],
  }),
  actions: {
    setSelectedNodeId(nodeId: number | null) {
      this.selectedNodeId = nodeId
    },
    setDayPlans(plans: DayPlanModel[]) {
      this.dayPlans = plans
    },
    clearDayPlans() {
      this.dayPlans = []
    },
  },
})