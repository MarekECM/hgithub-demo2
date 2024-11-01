import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSelectedItemStore = defineStore('selectedItem', () => {
  const selectedItem = ref<string>('Vyberte položku ze seznamu');

  function setSelectedItem(item: string) {
    selectedItem.value = item;
  }

  return { selectedItem, setSelectedItem };
});