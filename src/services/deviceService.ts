import axios from "axios";

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


