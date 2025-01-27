<script setup lang="ts">

import { useSidebarStore } from '@/stores/resize';
const sidebarStore = useSidebarStore();

</script>

<template> 
<div class="ecm-production" :class="sidebarStore.dynamicMargin">
    <div class="ecm-production__container">
        <div class="ecm-production__text-content">
            <div class="ecm-production__header">
                <span class="ecm-production__title">VYROBENO</span>
                <span class="ecm-production__subtitle">tento měsíc</span>
            </div>
            <div class="ecm-production__main">
                <span class="ecm-production__value">1035 kWh</span>
            </div>
            <div class="ecm-production__footer">
                <span class="ecm-production__difference">+ 12 %</span>
                <span class="ecm-production__comparison">o proti minulému měsíci</span>
            </div>
        </div>
        <div class="ecm-production__icon-container">
            <div class="ecm-production__icon-wrap">icon</div>
        </div>
    </div>
</div>
</template>
