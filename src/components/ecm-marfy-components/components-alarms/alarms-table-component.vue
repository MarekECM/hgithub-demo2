<script setup lang="ts">
import { useAlarms } from '@/composables/ecm-marfy/component-alarm-ts/useAlarms';

const { alarms, handleIconClick } = useAlarms();
</script>


<template>
  <div class="alarm-detail ecm-layout__container--default">
    <table class="alarm-detail__table">
      <thead class="alarm-detail__header">
      <tr class="alarm-detail__row">
        <th class="alarm-detail__cell alarm-detail__cell--name">NÁZEV</th>
        <th class="alarm-detail__cell alarm-detail__cell--status">STAV</th>
        <th class="alarm-detail__cell alarm-detail__cell--actions">AKCE</th>
      </tr>
      </thead>
      <tbody class="alarm-detail__body">
      <tr
          v-for="(alarm, index) in alarms"
          :key="index"
          class="alarm-detail__row"
      >
        <td class="alarm-detail__cell alarm-detail__cell--message">
          {{ alarm.message }}
        </td>
        <td class="alarm-detail__cell alarm-detail__cell--status">
            <span
                class="alarm-detail__status"
                :class="'alarm-detail__status--' + alarm.status.toLowerCase()"
            >
              {{ alarm.status }}
            </span>
        </td>
        <td class="alarm-detail__cell alarm-detail__cell--actions">
            <span
                v-for="icon in alarm.icons"
                :key="icon.icon"
                class="alarm-detail__icon material-icons"
                style="font-size: 25px;"
                @click="handleIconClick(icon.action, alarm)"
            >
              {{ icon.icon }}
            </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

