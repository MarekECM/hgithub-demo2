<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue';
import { useAlarms } from '@/composables/ecm-marfy/component-alarm-ts/useAlarms';
import { useNotificationForm } from '@/composables/ecm-marfy/component-alarm-ts/useNotificationForm';
import { useAlarmStore } from '@/stores/ecm-marfy/alarms/useAlarmStore';
import DynamicFormDialog from '@/composables/global/DynamicFormDialog.vue';

const {
  alarms,
  handleIconClick,
  selectedAlarm,
  selectAlarm,
  showEditDialog,
} = useAlarms();

const {
  editSchema,
  formName,
  handleSubmit,
} = useNotificationForm();

const alarmStore = useAlarmStore();
const selectedAlarmId = computed(() => alarmStore.selectedAlarmId);


onMounted(async () => {
  if (!alarmStore.alarms.length) {
    await alarmStore.fetchAlarms();
  }
  if (alarmStore.selectedAlarmId) {
    await nextTick();
    selectAlarm(alarmStore.selectedAlarmId);
  }
});
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
          v-for="alarm in alarms"
          :key="alarm.id"
          class="alarm-detail__row"
        :class="{ 'alarm-detail__row--selected': String(selectedAlarmId) === String(alarm.id) }"
          @click="selectAlarm(alarm.id)"
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
              v-if="alarm.icons.some((icon) => icon.action === 'schedule')"
              class="alarm-detail__icon material-icons"
              style="font-size: 25px;"
              @click.stop="handleIconClick('schedule', alarm)"
            >
              schedule
            </span>
            <span
              v-if="alarm.icons.some((icon) => icon.action === 'edit')"
              class="alarm-detail__icon material-icons"
              style="font-size: 25px;"
              @click.stop="handleIconClick('edit', alarm)"
            >
              edit
            </span>
            <span
              v-if="alarm.icons.some((icon) => icon.action === 'acknowledge')"
              class="alarm-detail__icon material-icons"
              style="font-size: 25px;"
              @click.stop="handleIconClick('acknowledge', alarm)"
            >
              check_circle
            </span>
            <span
              v-if="alarm.icons.some((icon) => icon.action === 'delete')"
              class="alarm-detail__icon material-icons"
              style="font-size: 25px;"
              @click.stop="handleIconClick('delete', alarm)"
            >
              delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <DynamicFormDialog
      v-if="selectedAlarm"
      v-model:showDialog="showEditDialog"
      :schema="editSchema"
      @submit="handleSubmit"
      :dialog-name="formName"
    />
  </div>
</template>

<style scoped>
.alarm-detail__row--selected {
  background-color: #e3f2fd34;
}
</style>