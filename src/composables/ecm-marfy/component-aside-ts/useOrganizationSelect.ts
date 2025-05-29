import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import { useMainSelect } from '@/stores/ui/useMainSelect';

interface Organization {
  id: number;
  name: string;
}

export function useOrganizationSelect() {
  const orgList = ref<Organization[]>([]);
  const isLoading = ref(false);
  const store = useSelectedItemStore();
  const mainSelect = useMainSelect();

  function saveSelectedOrgToStorage(orgId: number, orgName: string) {
    localStorage.setItem('selectedOrgId', orgId.toString());
    localStorage.setItem('selectedOrgName', orgName);
  }

  function getSelectedOrgFromStorage(): Organization | null {
    const orgId = localStorage.getItem('selectedOrgId');
    const orgName = localStorage.getItem('selectedOrgName');
    return orgId && orgName ? { id: parseInt(orgId), name: orgName } : null;
  }

  async function fetchOrganizations() {
    isLoading.value = true;
    try {
      const response = await axios.get<Organization[]>(
        `${import.meta.env.VITE_API_URL}Organization/Organizations`
      );
      orgList.value = response.data.sort((a, b) =>
        a.name.localeCompare(b.name, 'cs', {
          sensitivity: 'accent',
          caseFirst: 'upper',
        })
      );

      const savedOrg = getSelectedOrgFromStorage();
      if (savedOrg) {
        store.setSelectedItem(savedOrg.name, savedOrg.id);
      } else if (!store.selectedOrgId && orgList.value.length > 0) {
        const first = orgList.value[0];
        store.setSelectedItem(first.name, first.id);
        saveSelectedOrgToStorage(first.id, first.name);
      }
    } finally {
      isLoading.value = false;
    }
  }

  function handleSelect(item: Organization) {
    store.setSelectedItem(item.name, item.id);
    saveSelectedOrgToStorage(item.id, item.name);
    mainSelect.toggleStyle();
  }

  onMounted(fetchOrganizations);

  return {
    orgList,
    isLoading,
    handleSelect,
  };
}
