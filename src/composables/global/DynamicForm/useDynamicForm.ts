import {ref, nextTick} from "vue";
import axios from "axios";
import type {DynamicFormData} from "@/interfaces/DynamicFormDataInterface";
import type {FieldSchema} from "@/interfaces/DynamicFormField";
import { parseDefaultValue} from "@/composables/global/DynamicForm/dynamicFormFunctions"

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

    function prepareInitialFormData(schema: FieldSchema[], initialData?: Record<string, any>): Record<string, any> {
        const data: Record<string, any> = {};
        for (const field of schema) {
            const name = field.name;
            if (initialData && initialData[name] !== undefined) {
                data[name] = initialData[name];
            } else if (field.defaultValue !== undefined) {
                data[name] = parseDefaultValue(field);
            } else {
                data[name] = undefined;
            }
        }
        return data;
    }
    async function openForm(initialData?: Record<string, any>) {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}Form/${config.formModelName}`);
        editSchema.value = res.data;
        await nextTick();
        formData.value = prepareInitialFormData(editSchema.value, initialData);
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
