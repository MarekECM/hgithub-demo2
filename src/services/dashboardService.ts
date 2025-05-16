import { useSelectedItemStore } from "@/stores/useSelectedItemStore";
import axios from "axios";

export async function getDashboards(nodeId : number, orgId : number){
    const store = useSelectedItemStore();
    console.log(nodeId);
    switch(store.selectedSection){
        case "/home":
        case "/data":
            return await axios.get(`${import.meta.env.VITE_API_URL}Dashboard/GetDashboards`, {
                params: {
                    nodeId: nodeId,
                    orgId: orgId
                }
            });
        case "/souhrny":
            return await axios.get(`${import.meta.env.VITE_API_URL}Device/DeviceDashboard/${nodeId}`, {
                params: {
                    deviceId: nodeId,
                    orgId: orgId,
                    Preset: -1,
                    From: new Date(),
                    To: new Date(),
                }
            });
        case "/alarmy":
            return await axios.get(`${import.meta.env.VITE_API_URL}Notifications/Notifications`, {
                params: {
                    nodeId: nodeId,
                    OrganizationId: orgId,
                }
            });
        case "/denni-plany":
            return await axios.get(`${import.meta.env.VITE_API_URL}DayPlan`, {
                params: {
                    nodeId: nodeId
                }
            });
        default:
            return {data: null};
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



