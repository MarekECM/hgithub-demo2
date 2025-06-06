import {ref} from "vue";
import axios from "axios";
import type {DynamicFormConstants} from "@/interfaces/DynamicFormConstantsInterface";
import type {DynamicFormData} from "@/interfaces/DynamicFormDataInterface";

export function useDynamicForm(config: {
    formModelName: string;
    formName: string;
    onSubmit?: (data: any, formData : DynamicFormData) => Promise<void>;
}) {
    const showEditDialog = ref(false);
    const formData = ref<Record<string, any>>({})
    const editSchema = ref<any[]>([]);
    async function handleSubmit(data : any) {
        const formData : DynamicFormData = {
            formModelName: config.formModelName,
            showEditDialog : showEditDialog,
        }
        if (config.onSubmit) {
            await config.onSubmit(data,formData);
        } else {
            console.log(`Submit for ${config.formModelName} is not configured, value - `, formData);
        }
    }

    async function openForm(initialData?: Record<string, any>) {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}Form/${config.formModelName}`);
        editSchema.value = res.data;
        showEditDialog.value = true;
    }

    return {
        showEditDialog,
        formData,
        editSchema,
        handleSubmit,
        openForm,
        formName: config.formName,
        formModelName: config.formModelName
    };
}
