import axios from "axios";
import type {EditDeviceInterface} from "@/interfaces/ecm-marfy/devices/editDeviceInterface";

export async function DeleteDevice(nodeId : number){
    return await axios.delete(`${import.meta.env.VITE_API_URL}Device/Node`, {
        params: {
            nodeId: nodeId,
        }
    });
}

export async function DeleteElement(elementId : number){
    return await axios.delete(`${import.meta.env.VITE_API_URL}Device/Element`, {
        params: {
            elementId: elementId,
        }
    });
}

export async function UpdateElement(elementModel: any){
    const element : EditDeviceInterface = {
        Name: elementModel.elementName,
        NodeId: elementModel.nodeID,
        ElementId: elementModel.defaultElementID,
    };
    return await axios.put(`${import.meta.env.VITE_API_URL}Device/Element`, element);
}


