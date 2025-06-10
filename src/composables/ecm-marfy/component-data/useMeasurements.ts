import axios from "axios";
import type {AddMeasurementModel} from "@/interfaces/ecm-marfy/devices/AddMeasurementModel";
import {useDynamicForm} from "@/composables/global/DynamicForm/useDynamicForm";
import type {DynamicFormData} from "@/interfaces/DynamicFormDataInterface";
import {normalizeEmptyStrings} from "@/composables/global/DynamicForm/dynamicFormFunctions";
import {useSelectedItemStore} from "@/stores/ui/useSelectedItemStore";

async function addMeasurementFormSubmit(data : AddMeasurementModel, formData : DynamicFormData, toast : any){
    data.NodeId = useSelectedItemStore().selectedNodeId;
    const normalizedData = normalizeEmptyStrings(data);
    console.log('Trying to add or edit measurement:');
    console.log(normalizedData);
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}Device/AddOrEditMeasurement`, normalizedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        formData.showEditDialog.value = false;
        toast.add({severity: 'success', summary: 'Povedlo se', detail: `Veličinu se povedlo vytvořit'`, life: 3000});
    } catch (e: any) {
        toast.add({severity: 'error', summary: 'Error', detail: `Veličina nebyla vytvořena : ${e.message}`, life: 3000});
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
