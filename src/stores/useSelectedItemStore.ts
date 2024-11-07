import { defineStore } from 'pinia';
import { ref } from 'vue';

/* vybraní položky seznamu pro aside */

export const useSelectedItemStore = defineStore('selectedItem', () => {
  const selectedItem = ref<string>('Vyberte položku ze seznamu');

  function setSelectedItem(item: string) {
    selectedItem.value = item;
  }

  return { selectedItem, setSelectedItem };

  
});