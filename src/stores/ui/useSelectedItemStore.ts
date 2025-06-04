import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {OrgNode} from "@/interfaces/ecm-marfy/Organization/OrgNodeInterface";


export const useSelectedItemStore = defineStore('selectedItem', () => {
  // Stavové proměnné
  const selectedItem = ref<string>('Vyberte položku ze seznamu');
  const selectedOrgId = ref<number | null>(null);
  const selectedNodeId = ref<number | null>(null);
  const isNodeLeaf = ref<boolean>(true);
  const selectedSection = ref<string | null>(null);
  const orgTree = ref<OrgNode[]>([]);
  const isTreeLoadingTree = ref(false);
  const idOfLoadedTree = ref<number | null>(null);
  const expandedNodeIds = ref<Set<number>>(new Set());

  // Nastavení vybrané položky
  function setSelectedItem(item: string, orgId?: number, nodeId?: number) {
    selectedItem.value = item;
    if (orgId !== undefined) selectedOrgId.value = orgId;
    if (nodeId !== undefined) selectedNodeId.value = nodeId;
  }

  // Nastavení vybrané sekce
  function setSelectedSection(section: string) {
    selectedSection.value = section;
  }

  // Nastavení dat stromu
  function setOrgTreeData(data: OrgNode[]) {
    orgTree.value = data;
  }

  // Nastavení stavu načítání stromu
  function setIsTreeLoadingTree(loading: boolean) {
    isTreeLoadingTree.value = loading;
  }

  // Nastavení ID načteného stromu
  function setIdOfLoadedTree(id: number | null) {
    idOfLoadedTree.value = id;
  }

  // Reset stavu stromu
  function resetTreeState() {
    orgTree.value = [];
    isTreeLoadingTree.value = false;
    idOfLoadedTree.value = null;
    expandedNodeIds.value.clear();
  }

  // Přepínání rozbalení uzlu
  function toggleNodeExpanded(nodeId: number, isExpanded: boolean) {
    if (isExpanded) {
      expandedNodeIds.value.add(nodeId);
    } else {
      expandedNodeIds.value.delete(nodeId);
    }
  }

  // Kontrola, zda je uzel rozbalen
  function isNodeExpanded(nodeId: number): boolean {
    return expandedNodeIds.value.has(nodeId);
  }

  // Nalezení cesty k uzlu ve stromu
  function findNodePath(nodes: OrgNode[], targetNodeId: number): OrgNode[] | null {
    for (const node of nodes) {
      if (node.id === targetNodeId) {
        return [node];
      }
      if (node.children?.length) {
        const childPath = findNodePath(node.children, targetNodeId);
        if (childPath) {
          return [node, ...childPath];
        }
      }
    }
    return null;
  }

  // Rozbalení cesty k uzlu
  function expandNodePath(nodeId: number) {
    const path = findNodePath(orgTree.value, nodeId);
    if (path) {
      path.forEach(node => {
        toggleNodeExpanded(node.id, true);
      });
    }
  }

  return {
    selectedItem,
    selectedOrgId,
    selectedNodeId,
    selectedSection,
    orgTree,
    isTreeLoadingTree,
    idOfLoadedTree,
    setSelectedItem,
    setSelectedSection,
    setOrgTreeData,
    setIsTreeLoadingTree,
    setIdOfLoadedTree,
    resetTreeState,
    toggleNodeExpanded,
    isNodeExpanded,
    expandedNodeIds,
    findNodePath,
    expandNodePath,
  };
});