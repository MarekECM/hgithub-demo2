import { useSelectedItemStore } from "@/stores/ui/useSelectedItemStore";
import axios from "axios";
import {useAlarmStore} from "@/stores/ecm-marfy/alarms/useAlarmStore";


export async function getDashboards(nodeId: number, orgId: number) {
    const store = useSelectedItemStore();

    switch (store.selectedSection) {
        case "/home":
        case "/data":
            return await axios.get(`${import.meta.env.VITE_API_URL}Dashboard/GetDashboards`, {
                params: { nodeId, orgId }
            });

        case "/souhrny":
            return await axios.get(`${import.meta.env.VITE_API_URL}Device/DeviceDashboard/${nodeId}`, {
                params: {
                    deviceId: nodeId,
                    orgId,
                    Preset: -1,
                    From: new Date(Date.now() - 24 * 60 * 60 * 1000),
                    To: new Date(),
                }
            });

        case "/alarmy":
            return await getAlarmList(nodeId, orgId);

        case "/denni-plany":
            if (!nodeId) {
                console.warn("Neplatný nodeId – přeskakuji volání DayPlan API");
                return { data: [] };
            }
            try {
                console.log(nodeId )
                return await axios.get(`${import.meta.env.VITE_API_URL}DayPlan`, {
                    params: { nodeId : nodeId }
                });
            } catch (e: any) {
                console.error("Nepodařilo se načíst denní plány:", e.message);
                return { data: [] };
            }

        case "/statistiky":
            return await axios.get(`${import.meta.env.VITE_API_URL}Stats/TimeseriesData`, {
                params: {
                    nodeId,
                    Preset: -1,
                    From: new Date(Date.now() - 24 * 60 * 60 * 1000),
                    To: new Date(),
                }
            });

        default:
            return { data: null };
    }
}

export async function getSummaries(nodeId : number, orgId : number){
    return await axios.get(`${import.meta.env.VITE_API_URL}Dashboard/GetDashboards`, {
        params: {
            nodeId: nodeId,
            orgId: orgId
        }
    });
}

export async function getAlarmList(nodeId : number, orgId : number){
    await useAlarmStore().fetchAlarmTypes();
    return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/Notifications`, {
        params: {
            nodeId: nodeId,
            OrganizationId: orgId,
        }
    });
}



