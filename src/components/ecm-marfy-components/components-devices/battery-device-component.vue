<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize';
const sidebarStore = useSidebarStore();
</script>

<template>
<div class="ecm-battery" :class="sidebarStore.dynamicMargin">
    <div class="ecm-battery__wrap">
        <div class="ecm-battery__img-content">
            <div class="ecm-battery__date">
                <span class="ecm-battery__date-value">24.09.2024</span>
                <span class="ecm-battery__time-value">12:52</span>
            </div>
            
        </div>
        <span class="ecm-battery__img-content-background"></span>
        <div class="ecm-battery__content">
            <div class="ecm-battery__header">
                Baterie
            </div>
            <div class="ecm-battery__main">
                <span class="ecm-battery__text">STAV NABITÍ</span>
                <span class="ecm-battery__charge-value">65%</span>
            </div>
            <div class="ecm-battery__footer">
                <div class="ecm-battery__device-button">
                    <RouterLink :to="{ name: 'battery-detail' }">Zobrazit zařízení</RouterLink>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

