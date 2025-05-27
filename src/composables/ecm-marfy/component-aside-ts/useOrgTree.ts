import axios from 'axios';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';

export function useOrgTree() {
  const store = useSelectedItemStore();

  async function fetchOrgTree(orgId: number | null, onNodeClick?: (node: any) => Promise<void>) {
    if (!orgId) {
      store.resetTreeState();
      return;
    }

    if (store.orgTree.length > 0 && store.idOfLoadedTree === orgId) {
      return;
    }

    store.setIsTreeLoadingTree(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}Organization/Tree`, {
        params: { orgId }
      });

      if (Array.isArray(res.data)) {
        store.setOrgTreeData(res.data);
        store.setIdOfLoadedTree(orgId);

        res.data.forEach((node: any) => {
          store.toggleNodeExpanded(node.id, true);
          node.children?.forEach((child: any) => {
            store.toggleNodeExpanded(child.id, false);
          });
        });

        const firstNode = res.data[0];
        if (firstNode && onNodeClick) {
          await onNodeClick(firstNode);
        }
      }
    } catch (e) {
      console.error("Failed to fetch organization tree:", e);
      store.setOrgTreeData([]);
      store.setIdOfLoadedTree(null);
    } finally {
      store.setIsTreeLoadingTree(false);
    }
  }

  return {
    fetchOrgTree
  };
}
