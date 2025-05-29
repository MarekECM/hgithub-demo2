import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isAsideVisible: false,  // Stav viditelnosti aside
    navBarIcon: false,      // Stav pro ikonu navbaru
    sidebar: false,         // Stav pro sidebar
    isNotificationBar: false
  }),
  actions: {
    // Funkce pro přepnutí viditelnosti aside
    toggleAside() {
      this.isAsideVisible = !this.isAsideVisible;
    },
    toggleNotification(){
      this.isNotificationBar = !this.isNotificationBar;
    },
    closeNotification() {
      this.isNotificationBar = false;
    },
    toggleNavBar() {
      this.navBarIcon = !this.navBarIcon;
    },
      closeNavBar() {
    this.navBarIcon = false;
    },
    // Funkce pro přepnutí stavu sidebaru
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    }
  }
});