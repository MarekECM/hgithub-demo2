import type { DayPlanModel } from '@/interfaces/ecm-marfy/dailyPlans/DayPlanModel'
import axios from 'axios'
import { useDynamicForm } from '@/composables/global/DynamicForm/useDynamicForm'
import { normalizeEmptyStrings } from '@/composables/global/DynamicForm/dynamicFormFunctions'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'
import type { DynamicFormData } from '@/interfaces/ecm-marfy/forms/DynamicFormDataInterface'
import { useToast } from 'primevue/usetoast'

async function addDayPlanFormSubmit(
  data: DayPlanModel,
  formData: DynamicFormData,
  toast: ReturnType<typeof useToast>
) {
  const normalizedData = normalizeEmptyStrings(data)
  normalizedData.nodeId = useSelectedItemStore().selectedNodeId
  console.log('Trying to add or edit dayPlan:', normalizedData)
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}DayPlan/AddOrEditDayPlan`, normalizedData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    formData.showEditDialog.value = false
    toast.add({
      severity: 'success',
      summary: 'Úspěch',
      detail: 'Denní plán byl vytvořen',
      life: 3000
    })
  } catch (e: any) {
    console.error('Chyba při vytváření denního plánu:', e)
    toast.add({
      severity: 'error',
      summary: 'Chyba',
      detail: `Denní plán nebyl vytvořen: ${e.message}`,
      life: 3000
    })
  }
}

export function useAddDayPlanForm(toast: ReturnType<typeof useToast>) {
  const formModelName = 'AddDayPlanFormModel'
  const formHeader = 'Vytvořit denní plán'
  return useDynamicForm({
    formModelName,
    formName: formHeader,
    onSubmit: async (data: DayPlanModel, formData: DynamicFormData) => {
      await addDayPlanFormSubmit(data, formData, toast)
    }
  })
}
