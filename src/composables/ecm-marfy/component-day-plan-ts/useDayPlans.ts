import {ref} from "vue";
import type {DayPlanModel} from "@/interfaces/DayPlan/DayPlanModel";

export function useDayPlans() {
    const showEditDialog = ref(false);
    const selectedDayPlan = ref<DayPlanModel | null>(null);
    
    function addDayPlanClick(){
        showEditDialog.value = true;
        console.log("Test");
    }
    return {
        showEditDialog,
        selectedDayPlan,
        addDayPlanClick,
    }
}