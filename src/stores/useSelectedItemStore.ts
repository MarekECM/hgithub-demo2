import { defineStore } from 'pinia';
import { ref } from 'vue';

/* vybraní položky seznamu pro aside */

export const useSelectedItemStore = defineStore('selectedItem', () => {
  const selectedItem = ref<string>('Vyberte položku ze seznamu');
  const selectedOrgId = ref<number | null>(null);

  function setSelectedItem(item: string, orgId?: number) {
    selectedItem.value = item;
    if (orgId !== undefined) selectedOrgId.value = orgId;
  }

  return { selectedItem, selectedOrgId, setSelectedItem };
});