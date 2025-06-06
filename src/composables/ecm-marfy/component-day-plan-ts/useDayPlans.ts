import type {DayPlanModel} from "@/interfaces/ecm-marfy/DayPlan/DayPlanModel";
import axios from "axios";
import {ref} from "vue";
import {useDynamicForm} from "@/composables/global/DynamicForm/useDynamicForm";
import {normalizeEmptyStrings} from "@/composables/global/DynamicForm/dynamicFormFunctions";
import {useSelectedItemStore} from "@/stores/ui/useSelectedItemStore";
import type {DynamicFormData} from "@/interfaces/DynamicFormDataInterface";
import {useToast} from "primevue/usetoast";

async function addDayPlanFormSubmit(data : DayPlanModel, formData : DynamicFormData, toast: any){
    const normalizedData = normalizeEmptyStrings(data);
    normalizedData.nodeId = useSelectedItemStore().selectedNodeId;
    console.log('Trying to add or edit dayPlan:', normalizedData);
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}DayPlan/AddOrEditDayPlan`, normalizedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        formData.showEditDialog.value = false;
    } catch (e: any) {
        console.log("TEST");
        toast.add({severity: 'error', summary: 'Error', detail: `Denní plán nebyl vytvořen : ${e.message}`, life: 3000});
    }
}
export function useAddDayPlanForm(toast : any) {
    const formModelName : string = "AddDayPlanFormModel";
    const formHeader : string = "Vytvořit denní plán";
    return useDynamicForm({
        formModelName: formModelName,
        formName: formHeader,
        onSubmit: async (data : DayPlanModel, formData : DynamicFormData) => {
            await addDayPlanFormSubmit(data, formData, toast);
        }
    });
}