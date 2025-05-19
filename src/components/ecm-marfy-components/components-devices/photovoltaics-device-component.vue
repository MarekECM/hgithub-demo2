<!-- src/components/ecm-marfy-components/components-devices/photovoltaics-device-component.vue -->
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
  <div class="ecm-photovoltaics" :class="sidebarStore.dynamicMargin">
    <div class="ecm-photovoltaics__wrap">
      <div class="ecm-photovoltaics__img-content">
        <div class="ecm-photovoltaics__date">
          <span class="ecm-photovoltaics__date-value">
            {{ data.lastInsert ? new Date(data.lastInsert).toLocaleDateString('cs-CZ') : '-' }}
          </span>
          <span class="ecm-photovoltaics__time-value">
            {{ data.lastInsert ? new Date(data.lastInsert).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) : '-' }}
          </span>
        </div>
      </div>
      <div class="ecm-photovoltaics__content">
        <div class="ecm-photovoltaics__header">
          {{ data.nodeName || 'Fotovoltaika' }}
        </div>
        <div class="ecm-photovoltaics__main">
          <span class="ecm-photovoltaics__text">{{ data.elementName }}</span>
          <span class="ecm-photovoltaics__charge-value">
            {{ normalizeValue(data.lastValue, data.unit, data.manualUnit) }} {{ data.manualUnit }}
          </span>
        </div>
        <div class="ecm-photovoltaics__footer">
          <div class="ecm-photovoltaics__device-button">
            <RouterLink :to="{ name: 'photovoltaics-detail', params: { id: data.nodeID } }">
              Zobrazit zařízení
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
