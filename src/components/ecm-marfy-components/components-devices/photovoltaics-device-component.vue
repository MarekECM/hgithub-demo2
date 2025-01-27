<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize';
const sidebarStore = useSidebarStore();
</script>

<template>
  <div class="ecm-photovoltaics" :class="sidebarStore.dynamicMargin">
    <div class="ecm-photovoltaics__wrap">
      <div class="ecm-photovoltaics__img-content">
        <div class="ecm-photovoltaics__date">
          <span class="ecm-photovoltaics__date-value">24.09.2024</span>
          <span class="ecm-photovoltaics__time-value">12:52</span>
        </div>
      </div>
      <div class="ecm-photovoltaics__content">
        <div class="ecm-photovoltaics__header">Fotovoltaika</div>
        <div class="ecm-photovoltaics__main">
          <span class="ecm-photovoltaics__text">AKTUALNÍ VÝKON</span>
          <span class="ecm-photovoltaics__charge-value">65%</span>
        </div>
        <div class="ecm-photovoltaics__footer">
          <div class="ecm-photovoltaics__device-button">
            <RouterLink :to="{ name: 'photovoltaics-detail' }">Zobrazit zařízení</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

