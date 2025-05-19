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


<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useSelectedItemStore} from "@/stores/useSelectedItemStore";
import {getAlarmList} from "@/services/dashboardService";
import {getOneAlarmHistory} from "@/services/alarmService";


interface AlarmIcon {
  icon: string;
  action: string;
}

class AlarmModel {
  alarmId: number;
  message: string;
  status: string;
  icons: AlarmIcon[];

  constructor(
      alarmId: number,
      message: string,
      status: string,
      icons: AlarmIcon[] = []
  ) {
    this.alarmId = alarmId;
    this.message = message;
    this.status = status;
    this.icons = icons;
  }
}

const alarms = ref<AlarmModel[]>([])

function handleIconClick(action: string, alarm: AlarmModel) {
  switch (action) {
    case 'schedule':
      getOneAlarmHistory(alarm.alarmId).then(history => {
        console.log('Alarm History:', history);
      });
      break;
    case 'edit':
      console.log('Edit clicked for', alarm);
      break;
    case 'acknowledge':
      console.log('Acknowledge clicked for', alarm);
      break;
    case 'delete':
      console.log('Delete clicked for', alarm);
      break;
    default:
      console.warn('Unknown action:', action);
  }
}

onMounted(async () => {
  try {
    const selectedStore = useSelectedItemStore()
    const orgId = selectedStore.selectedOrgId;
    const nodeId = selectedStore.selectedNodeId;

    if (nodeId === null || orgId === null) return;

    const rawAlarms = await getAlarmList(nodeId, orgId)

    alarms.value = rawAlarms.data.map((alarm: any) => {
      const id = alarm.id;
      const message = alarm.name || alarm.message || 'Neznámý alarm';
      const status = alarm.status || 'ok';

      const icons: AlarmIcon[] = status.toLowerCase?.() === 'alarm'
          ? [{ icon: 'check_circle', action: 'acknowledge' }]
          : [
            { icon: 'schedule', action: 'schedule' },
            { icon: 'edit', action: 'edit' },
            { icon: 'check_circle', action: 'acknowledge' },
            { icon: 'delete', action: 'delete' }
          ];

      return new AlarmModel(id,message, status, icons);
    });

  } catch (error) {
    console.error('Failed to load alarms:', error);
  }
})
</script>
