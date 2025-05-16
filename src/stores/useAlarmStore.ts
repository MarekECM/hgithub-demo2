import {defineStore} from "pinia";
import {loginService, logoutService} from "@/services/authService";
import router from "@/router";
import axios from "axios";
import {useSelectedItemStore} from "@/stores/useSelectedItemStore";

export const useAlarmStore =  defineStore('alarm', {
    actions: {
        async showAlarmHistory(){
            let selectedStore = useSelectedItemStore();
            
            let orgId = selectedStore.selectedOrgId;
            
            if(orgId == null)
                return;

            let history = await this.getAlarmHistory(orgId);
            
            console.log(history);
        },
        
        async getAlarmHistory(orgId: number){
            return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/NotificationsHistory`, {
                params: {
                    OrganizationId: orgId,
                }
            });
        }
    }
})
