<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize';
const sidebarStore = useSidebarStore();
</script>

<template>
<div class="ecm-electricity-meter" :class="sidebarStore.dynamicMargin">
  <div class="ecm-electricity-meter__wrap">
      <div class="ecm-electricity-meter__img-content">
        <div class="ecm-electricity-meter__date">
          <span class="ecm-electricity-meter__date-value">24.09.2024</span>
          <span class="ecm-electricity-meter__date-time-value">12:52</span>
        </div>
      </div>
      <div class="ecm-electricity-meter__content">
        <div class="ecm-electricity-meter__header">
          Elektroměr
        </div>
        <div class="ecm-electricity-meter__main">
          <span class="ecm-electricity-meter__text">CELKOVÁ SPOTŘEBA ADMINISTRATIVA</span>
          <span class="ecm-electricity-meter__charge-value">65%</span>
        </div>
        <div class="ecm-electricity-meter__footer">
          <div class="ecm-electricity-meter__device-button">
            <RouterLink :to="{ name: 'electricitymeter-detail' }">Zobrazit zařízení</RouterLink>
          </div>
        </div>
      </div>
  </div>
</div>
</template>
