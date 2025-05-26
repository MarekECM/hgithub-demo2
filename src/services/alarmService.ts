import { useSelectedItemStore } from "@/stores/useSelectedItemStore";
import axios from "axios";
import {useAlarmStore} from "@/stores/useAlarmStore";

export async function getOneAlarmHistory(alarmId : number){
    const store = useSelectedItemStore();
    return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/NotificationsHistory/`, {
        params: {
            OrganizationId: store.selectedOrgId,
            LocationId: alarmId,
        }
    });
}

export async function getAlarmHistory(orgId: number){
    return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/NotificationsHistory`, {
        params: {
            OrganizationId: orgId,
        }
    });
}
export async function getNotificationTypes(){
    const alarmStore = useAlarmStore();
    console.log(alarmStore.alarmTypes);
    return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/NotificationTypes`);
}

export async function deleteAlarm(alarmId : number){
    console.log("delete alarm: " + alarmId);
}



