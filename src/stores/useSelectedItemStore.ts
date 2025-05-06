import { defineStore } from 'pinia';
import { ref } from 'vue';

/* vybraní položky seznamu pro aside */

export const useSelectedItemStore = defineStore('selectedItem', () => {
    const selectedItem = ref<string>('Vyberte položku ze seznamu');
    const selectedOrgId = ref<number | null>(null);
    const selectedNodeId = ref<number | null>(null);

    function setSelectedItem(item: string, orgId?: number, nodeId?: number) {
        selectedItem.value = item;
        if (orgId !== undefined) selectedOrgId.value = orgId;
        if (nodeId !== undefined) selectedNodeId.value = nodeId;
    }

    return { selectedItem, selectedOrgId, setSelectedItem, selectedNodeId };
});