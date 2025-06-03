import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isAsideVisible: false, 
    navBarIcon: false,    
    sidebar: false,       
    isNotificationBar: false
  }),
  actions: {
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
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    }
  }
});