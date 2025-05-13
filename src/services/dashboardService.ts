import { useSelectedItemStore } from "@/stores/useSelectedItemStore";
import axios from "axios";

export async function getDashboards(nodeId : number, orgId : number){
    const store = useSelectedItemStore();
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



