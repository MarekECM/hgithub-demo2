import {ref} from "vue";
import type {Ref} from "vue";
import type {DayPlanModel} from "@/interfaces/DayPlan/DayPlanModel";
import axios from "axios";
import type {FieldSchema} from "@/interfaces/DynamicFormField";

export function useDayPlans() {
    const showEditDialog = ref(false);
    const selectedDayPlan = ref<DayPlanModel | null>(null);

    async function addDayPlanClick(editSchema: Ref<FieldSchema[]>) {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}Form/AddDayPlanFormModel`);
        editSchema.value = res.data;
        showEditDialog.value = true;
    }
    return {
        showEditDialog,
        selectedDayPlan,
        addDayPlanClick,
    }
}