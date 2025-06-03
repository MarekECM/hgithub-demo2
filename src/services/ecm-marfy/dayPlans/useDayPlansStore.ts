import { defineStore } from 'pinia'
import type { DayPlanModel } from '@/interfaces/ecm-marfy/DayPlan/DayPlanModel'
import axios from 'axios'

export const useDayPlansStore = defineStore('dayPlans', {
  state: () => ({
    dayPlans: [] as DayPlanModel[],
  }),

  actions: {
    setDayPlans(plans: DayPlanModel[]) {
      this.dayPlans = plans
    },

    async fetchDayPlans(nodeId: number) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}DayPlan`, {
          params: { nodeId }
        })
        this.dayPlans = response.data
      } catch (error) {
        console.error('Chyba při načítání denních plánů:', error)
      }
    }
  }
})
