
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('resize', () => {
  const width = ref(300); // počáteční šířka sidebaru
  const isWide = ref(false); 
  
  function setWidth(newWidth: number) {
    width.value = newWidth;

    // Pokud šířka sidebaru presahne 500px odebere se z DOM horizontalní menu
    if (newWidth > 400) {
      isWide.value = true;
    } else {
      isWide.value = false;
    }
  }

  return {
    width,
    isWide, // Expozice proměnné isWide
    setWidth,
  };
});

