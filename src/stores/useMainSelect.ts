import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainSelect = defineStore('style', () => {
    
    const isActive = ref(false);

    const addStyle = () => {
        isActive.value = true;
    }

    const removeStyle = () => {
        isActive.value = false
    }

    const toggleStyle = () => {
        isActive.value = !isActive.value;
    }

    return { isActive, addStyle, removeStyle, toggleStyle}
})