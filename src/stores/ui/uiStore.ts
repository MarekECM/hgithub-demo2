import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isAsideVisible: false,  // Stav viditelnosti aside
    navBarIcon: false,      // Stav pro ikonu navbaru
    sidebar: false,         // Stav pro sidebar
  }),
  actions: {
    // Funkce pro přepnutí viditelnosti aside
    toggleAside() {
      this.isAsideVisible = !this.isAsideVisible;
    },
    // Funkce pro přepnutí stavu navbar ikony
    toggleNavBar() {
      this.navBarIcon = !this.navBarIcon;
    },
    // Funkce pro přepnutí stavu sidebaru
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    }
  }
});