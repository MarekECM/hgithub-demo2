import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
    state: () => ({
        isAsideVisible: false,
    }),

    actions: {
        toggleAside() {
            this.isAsideVisible = !this.isAsideVisible
        }
    }
})
