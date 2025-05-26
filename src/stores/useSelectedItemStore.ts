import { defineStore } from 'pinia';
import { ref } from 'vue';

/* vybraní položky seznamu pro aside */

export const useSelectedItemStore = defineStore('selectedItem', () => {
    const selectedItem = ref<string>('Vyberte položku ze seznamu');
    const selectedOrgId = ref<number | null>(null);
    const selectedNodeId = ref<number | null>(null);
    const selectedSection = ref<string | null>(null);

    const orgTree = ref<any[]>([]);
    const isTreeLoadingTree = ref(false);
    const idOfLoadedTree = ref<number | null>(null);
    const expandedNodeIds = ref<Set<number>>(new Set());

    function setSelectedItem(item: string, orgId?: number, nodeId?: number) {
        selectedItem.value = item;
        if (orgId !== undefined) selectedOrgId.value = orgId;
        if (nodeId !== undefined) selectedNodeId.value = nodeId;
    }

    function setSelectedSection(section : string){
        selectedSection.value = section;
    }

    function setOrgTreeData(data: any[]) {
        orgTree.value = data;
    }

    function setIsTreeLoadingTree(loading: boolean) {
        isTreeLoadingTree.value = loading;
    }

    function setIdOfLoadedTree(id: number | null) {
        idOfLoadedTree.value = id;
    }

    function resetTreeState() {
        orgTree.value = [];
        isTreeLoadingTree.value = false;
        idOfLoadedTree.value = null;
    }

    function toggleNodeExpanded(nodeId: number, isExpanded: boolean) {
        if (isExpanded) {
            expandedNodeIds.value.add(nodeId);
        } else {
            expandedNodeIds.value.delete(nodeId);
        }
    }

    function isNodeExpanded(nodeId: number): boolean {
        return expandedNodeIds.value.has(nodeId);
    }

    return { 
        selectedItem, 
        selectedOrgId, 
        setSelectedItem, 
        selectedNodeId,
        orgTree,
        isTreeLoadingTree,
        idOfLoadedTree,
        setOrgTreeData,
        setIsTreeLoadingTree,
        setIdOfLoadedTree,
        resetTreeState,
        toggleNodeExpanded,
        isNodeExpanded,
        expandedNodeIds,
        setSelectedSection,
        selectedSection,
    };
});