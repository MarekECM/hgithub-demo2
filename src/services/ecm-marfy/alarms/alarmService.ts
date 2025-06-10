import { useSelectedItemStore } from "@/stores/ui/useSelectedItemStore";
import axios from "axios";
import { useAlarmStore } from "@/stores/ecm-marfy/alarms/useAlarmStore";

export async function getOneAlarmHistory(alarmId: number) {
  const store = useSelectedItemStore();
  return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/NotificationsHistory/`, {
    params: {
      OrganizationId: store.selectedOrgId,
      LocationId: alarmId,
    },
  });
}

export async function getAlarmHistory(orgId: number) {
  return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/NotificationsHistory`, {
    params: {
      OrganizationId: orgId,
    },
  });
}

export async function getNotificationTypes() {
  const alarmStore = useAlarmStore();
  console.log(alarmStore.alarmTypes);
  return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/NotificationTypes`);
}

export async function deleteAlarm(alarmId: number) {
  console.log("delete alarm: " + alarmId);
  return await axios.delete(`${import.meta.env.VITE_API_URL}Notifications/${alarmId}`);
}

export async function getAlarmList(nodeId: number, orgId: number) {
  return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/Notifications`, {
    params: {
      OrganizationId: orgId,
      NodeId: nodeId,
    },
  });
}

