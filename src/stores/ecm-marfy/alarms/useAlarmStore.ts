import {defineStore} from "pinia";
import {useSelectedItemStore} from "@/stores/ui/useSelectedItemStore";
import {getAlarmHistory, getNotificationTypes} from "@/services/ecm-marfy/alarms/alarmService";

export const useAlarmStore =  defineStore('alarm', {
    state: () => ({
        alarmTypes: [] as any[],
    }),
    
    actions: {
        async showAlarmHistory(){
            let selectedStore = useSelectedItemStore();
            
            let orgId = selectedStore.selectedOrgId;
            
            if(orgId == null)
                return;

            let history = await getAlarmHistory(orgId);
            
            console.log(history);
        },

        async fetchAlarmTypes() {
            if (this.alarmTypes.length > 0) return;

            try {
                const response = await getNotificationTypes();
                console.log(response.data);
                this.alarmTypes = response.data;
            } catch (err) {
                console.error("Failed to fetch alarm types", err);
            }
        },
    }
})
