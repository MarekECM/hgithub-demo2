import { ref } from 'vue';
import axios from 'axios';

export interface Organization {
  id: number;
  name: string;
}

export function useOrganizations() {
  const orgList = ref<Organization[]>([]);
  const isLoading = ref(false);

  function saveSelectedOrgToStorage(orgId: number, orgName: string) {
    localStorage.setItem('selectedOrgId', orgId.toString());
    localStorage.setItem('selectedOrgName', orgName);
  }

  function getSelectedOrgFromStorage(): Organization | null {
    const orgId = localStorage.getItem('selectedOrgId');
    const orgName = localStorage.getItem('selectedOrgName');

    return orgId && orgName
      ? { id: parseInt(orgId), name: orgName }
      : null;
  }

  async function fetchOrganizations() {
    isLoading.value = true;
    try {
      const response = await axios.get<Organization[]>(
        `${import.meta.env.VITE_API_URL}Organization/Organizations`
      );
      orgList.value = response.data
        .slice()
        .sort((a, b) =>
          (a.name || '').localeCompare(b.name || '', 'cs', {
            sensitivity: 'accent',
            caseFirst: 'upper',
          })
        );
    } finally {
      isLoading.value = false;
    }
  }

  return {
    orgList,
    isLoading,
    fetchOrganizations,
    saveSelectedOrgToStorage,
    getSelectedOrgFromStorage,
  };
}
