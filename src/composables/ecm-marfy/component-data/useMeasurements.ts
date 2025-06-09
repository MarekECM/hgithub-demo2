import axios from "axios";
import type {AddMeasurementModel} from "@/interfaces/ecm-marfy/devices/AddMeasurementModel";
import {useDynamicForm} from "@/composables/global/DynamicForm/useDynamicForm";
import type {DynamicFormData} from "@/interfaces/DynamicFormDataInterface";
import {normalizeEmptyStrings} from "@/composables/global/DynamicForm/dynamicFormFunctions";
import {useToast} from "primevue/usetoast";

async function addMeasurementFormSubmit(data : AddMeasurementModel, formData : DynamicFormData, toast : any){
    const normalizedData = normalizeEmptyStrings(data);
    console.log('Trying to add or edit measurement:', normalizedData);
    try {
        console.log(normalizedData);
        const res = await axios.post(`${import.meta.env.VITE_API_URL}Device/AddOrEditMeasurement`, normalizedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        formData.showEditDialog.value = false;
    } catch (e: any) {
        toast.add({severity: 'error', summary: 'Error', detail: `Denní plán nebyl vytvořen : ${e.message}`, life: 3000});
    }
}
export function useAddMeasurementForm(toast : any) {
    const formModelName : string = "AddMeasurementFormModel";
    const formHeader : string = "Přidat veličinu";
    return useDynamicForm({
        formModelName: formModelName,
        formName: formHeader,
        onSubmit: async (data : AddMeasurementModel, formData : DynamicFormData) => {
            await addMeasurementFormSubmit(data, formData, toast);
        }
    });
}
