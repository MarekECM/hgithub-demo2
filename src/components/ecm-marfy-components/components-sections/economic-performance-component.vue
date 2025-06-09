<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/resize';
const sidebarStore = useSidebarStore();
</script>

<template>
<div class="ecm-economic-performance" :class="sidebarStore.dynamicMargin">
    <div class="ecm-economic-performance__container">
        <div class="ecm-economic-performance__text-content">
            <div class="ecm-economic-performance__header">
                <span class="ecm-economic-performance__title">VÝSLEDEK</span>
                <span class="ecm-economic-performance__subtitle">HOSPODAŘENÍ</span>
            </div>
            <div class="ecm-economic-performance__main">
                <span class="ecm-economic-performance__value">1035 kWh</span>
            </div>
            <div class="ecm-economic-performance__footer">
                <span class="ecm-economic-performance__difference">+ 12 %</span>
                <span class="ecm-economic-performance__comparison">o proti minulému měsíci</span>
            </div>
        </div>
        <div class="ecm-economic-performance__icon-container">
            <div class="ecm-economic-performance__icon-wrap">icon</div>
        </div>
    </div>
</div>
</template>

