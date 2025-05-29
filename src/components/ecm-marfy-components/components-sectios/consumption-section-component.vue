<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/resize';
const sidebarStore = useSidebarStore();
</script>

<template>
    <div class="ecm-consumption" :class="sidebarStore.dynamicMargin">
    <div class="ecm-consumption__container">
        <div class="ecm-consumption__text-content">
            <div class="ecm-consumption__header">
                <span class="ecm-consumption__title">SPOTŘEBOVÁNO</span>
                <span class="ecm-consumption__subtitle">tento měsíc</span>
            </div>
            <div class="ecm-consumption__main">
                <span class="ecm-consumption__value">1035 kWh</span>
            </div>
            <div class="ecm-consumption__footer">
                <span class="ecm-consumption__difference">+ 12 %</span>
                <span class="ecm-consumption__comparison">o proti minulému měsíci</span>
            </div>
        </div>
        <div class="ecm-consumption__icon-container">
            <div class="ecm-consumption__icon-wrap">icon</div>
        </div>
    </div>
</div>

</template>
