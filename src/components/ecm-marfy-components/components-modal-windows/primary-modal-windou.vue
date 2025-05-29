<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';

const sidebarStore = useSidebarStore();
const fontSize = computed(() => (sidebarStore.width > 600 ? '40px' : '8px'));
</script>

<template>
<div class="ecm-primary-modal">
    <div class="ecm-primary-modal__container">
        <div class="ecm-primary-modal__img"></div>
        <div class="ecm-primary-modal__title" :style="{ fontSize: fontSize }">Nemáte k dispozici žadné data</div>
        <div class="ecm-primary-modal__text-content">Momentálně nemáte k dispozici žádné reporty. Pro jejich vytvoření postupujde podle instukcí.</div>
    </div>
</div>
</template>