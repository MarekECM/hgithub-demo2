<!-- <script setup lang="ts">
import { useSidebarStore } from '@/stores/resize'
import { RouterLink } from 'vue-router'
const sidebarStore = useSidebarStore()
defineProps<{ data: any }>()

</script> -->

<template>
<div class="ecm-electricity-meter" :class="sidebarStore.dynamicMargin">
  <!-- <div class="ecm-electricity-meter__wrap">
      <div class="ecm-electricity-meter__img-content">
        <div class="ecm-electricity-meter__date">
          <span class="ecm-electricity-meter__date-value">
            {{ data.lastInsert ? (new Date(data.lastInsert)).toLocaleDateString('cs-CZ') : '-' }}
          </span>
          <span class="ecm-electricity-meter__date-time-value">
            {{ data.lastInsert ? (new Date(data.lastInsert)).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) : '-' }}
          </span>
        </div>
      </div>
      <div class="ecm-electricity-meter__content">
        <div class="ecm-electricity-meter__header">
          {{ data.nodeName || 'Zařízení' }}
        </div>
        <div class="ecm-electricity-meter__main">
          <span class="ecm-electricity-meter__text">{{ data.elementName }}</span>
          <span class="ecm-electricity-meter__charge-value">
            {{ data.lastValue }} {{ data.unit }}
          </span>
        </div>
        <div class="ecm-electricity-meter__footer">
          <div class="ecm-electricity-meter__device-button">
            <RouterLink :to="{ name: 'electricitymeter-detail', params: { id: data.id } }">Zobrazit zařízení</RouterLink>
          </div>
        </div>
      </div>
  </div> -->
</div>
</template>
