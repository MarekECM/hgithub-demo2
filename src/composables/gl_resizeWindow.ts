// gl_resizeWindow.ts
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useSidebarStore } from '@/stores/resize'; 

export function useWindowResize() {

  const sidebarStore = useSidebarStore();

  // Reaktivní proměnná pro sledování šířky okna
  const windowWidth = ref(window.innerWidth);

  // Funkce pro aktualizaci šířky okna
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };

  // Přidání event listeneru při načtení komponenty
  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Nastavení počáteční šířky okna
  });

  // Odebrání event listeneru při zničení komponenty
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  // Dynamický styl pro element
  const dynamicStyles = computed(() => {
    if (windowWidth.value > 712) {
      // Pokud je šířka okna větší než 712px, použij styly
      return {
       marginLeft: `${sidebarStore.width}px`,
       width: `calc(100% - ${sidebarStore.width}px)`
      };
    } else {
      // Pokud je šířka okna menší nebo rovná 712px, odeber styly
      return {};
    }
  });

  return {
    windowWidth,
    dynamicStyles
  };
}
