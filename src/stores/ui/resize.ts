import { defineStore } from 'pinia';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

export const useSidebarStore = defineStore('resize', () => {
  const width = ref(300); // počáteční šířka sidebaru
  const isWide = ref(false);
  const windowWidth = ref(window.innerWidth); // Reaktivní proměnná pro šířku okna

  // Funkce pro aktualizaci šířky okna
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
    // Pokud šířka okna přesáhne určitou hodnotu, nastav šířku sidebaru
    if (windowWidth.value <= 712) {
      width.value = 300; // Příklad: při malém okně dej sidebar na 300px
    }
  };

  // Přidání event listeneru při načtení komponenty
  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Inicializace při mountování
  });

  // Odebrání event listeneru při zničení komponenty
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  // Funkce pro nastavení šířky sidebaru
  function setWidth(newWidth: number) {
    width.value = newWidth;

    // Pokud šířka sidebaru přesahuje 500px, nastavit isWide na true
    if (newWidth > 500) {
      isWide.value = true;
    } else {
      isWide.value = false;
    }
  }

  // Dynamické styly pro šířku okna
  const dynamicStyles = computed(() => {
    if (windowWidth.value > 712) {
      return {
        marginLeft: `${width.value}px`,
        width: `calc(100% - ${width.value}px)`
      };
    } else {
      return {}; 
    }
  });

  // Dynamické třídy pro komponenty
  const dynamicMargin = computed(() => {
    // Přidání dynamické třídy, pokud je šířka větší než 1200px
    if (width.value > 1200) {
      return { 'dynamic-margin': true };
    } else {
      return {}; // Žádné třídy pro menší šířky
    }
  });

  const dynamicFontsizeV1 = computed(() => {
    // Přidání dynamické třídy, pokud je šířka větší než 1200px
    if (width.value > 1200) {
      return { 'dynamic-fontSize-v1': true }; //25px
    } else {
      return {}; // Žádné třídy pro menší šířky
    }

  });

  const dynamicFontsizeV2 = computed(() => {
    // Přidání dynamické třídy, pokud je šířka větší než 1200px
    if (width.value > 1200) {
      return { 'dynamic-fontSize-v2': true }; //13px
    } else {
      return {}; // Žádné třídy pro menší šířky
    }

  });

  return {
    width,
    isWide,
    setWidth,
    dynamicFontsizeV1,
    dynamicFontsizeV2,
    dynamicStyles,
    dynamicMargin 
  };
});
