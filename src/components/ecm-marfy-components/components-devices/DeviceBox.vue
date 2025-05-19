<script setup lang="ts">
import {useSidebarStore} from '@/stores/resize'
import {RouterLink} from 'vue-router'
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import ConfirmDialog from 'primevue/confirmdialog';

const sidebarStore = useSidebarStore()
const confirm = useConfirm();
const toast = useToast();
defineProps<{ data: any }>()

function delDeviceOrElement(elementId: number, deviceId: number) {
  let message = "Opravdu chcete smazat " + (elementId != null ? "tenhle element" : "tohle zařízení") + "?";
  
  confirm.require({
    message: message,
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: () => {
      //elementId != null ? DeleteElement(elementId) : DeleteDevice(deviceId);
      console.log("DELETE");
    },
    reject: () => {
      toast.add({severity: 'error', summary: 'Rejected', detail: 'No record deleted', life: 3000});
    }
  })
}

</script>

<template>
  <div class="ecm-electricity-meter" :class="sidebarStore.dynamicMargin">
    <div class="ecm-electricity-meter__wrap">
      <div class="ecm-electricity-meter__img-content">
        <div class="ecm-electricity-meter__date">
          <span class="ecm-electricity-meter__date-value">
            {{ data.lastInsert ? (new Date(data.lastInsert)).toLocaleDateString('cs-CZ') : '-' }}
          </span>
          <span class="ecm-electricity-meter__date-time-value">
            {{
              data.lastInsert ? (new Date(data.lastInsert)).toLocaleTimeString('cs-CZ', {
                hour: '2-digit',
                minute: '2-digit'
              }) : '-'
            }}
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
          <div style="display: flex; justify-content: space-evenly;">
            <button class="ecm-electricity-meter__device-button" style="width: 20px"
                    @click="delDeviceOrElement(data.id,data.nodeID)">Delete
            </button>
            <button class="ecm-electricity-meter__device-button" style="width: 20px">Edit</button>
          </div>
        </div>
        <div class="ecm-electricity-meter__footer">
          <div class="ecm-electricity-meter__device-button">
            <RouterLink :to="{ name: 'electricitymeter-detail', params: { id: data.id } }">Zobrazit zařízení
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
