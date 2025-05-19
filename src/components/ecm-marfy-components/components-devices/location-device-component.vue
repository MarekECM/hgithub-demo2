
<script setup lang="ts">
import { useSidebarStore } from '@/stores/resize';
import { RouterLink } from 'vue-router';
import type { DeviceData } from '@/interfaces/deviceData';

const sidebarStore = useSidebarStore();

defineProps<{
  data: DeviceData;
}>();

function normalizeValue(value: string, unit: string, manualUnit: string): string {
  const numericValue = parseFloat(value.replace(',', '.'));
  if (unit === 'W' && manualUnit === 'kW') {
    return (numericValue / 1000).toFixed(2); // Převod z W na kW
  }
  return numericValue.toFixed(2);
}
</script>

<template>
  <div class="ecm-location" :class="sidebarStore.dynamicMargin">
    <div class="ecm-location__wrap">
      <div class="ecm-location__img-content">
        <div class="ecm-location__date">
          <span class="ecm-location__date-value">
            {{ data.lastInsert ? new Date(data.lastInsert).toLocaleDateString('cs-CZ') : '-' }}
          </span>
          <span class="ecm-location__time-value">
            {{ data.lastInsert ? new Date(data.lastInsert).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) : '-' }}
          </span>
        </div>
      </div>
      <div class="ecm-location__content">
        <div class="ecm-location__header">
          {{ data.nodeName || 'Lokalita' }}
        </div>
        <div class="ecm-location__main">
          <span class="ecm-location__text">{{ data.elementName }}</span>
          <span class="ecm-location__charge-value">
            {{ normalizeValue(data.lastValue, data.unit, data.manualUnit) }} {{ data.manualUnit }}
          </span>
        </div>
        <div class="ecm-location__footer">
          <div class="ecm-location__device-button">
            <RouterLink :to="{ name: 'location-detail', params: { id: data.nodeID } }">
              Zobrazit zařízení
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
