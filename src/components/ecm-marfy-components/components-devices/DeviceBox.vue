<script setup lang="ts">
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import SpeedDial from 'primevue/speeddial'
import { useDeviceBox } from '@/composables/ecm-marfy/componenet-devices/ui/useDeviceBox'
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData'

// Definice props s explicitním typem
const props = defineProps<{
  parameter?: string
  data: DeviceData
  variant?: string
}>()

const {
  showDialog,
  editedElementName,
  settingsIcons,
  backgroundClass,
  navigateToDevice,
  delDeviceOrElement,
  saveElementName,
  sidebarStore
} = useDeviceBox(props)
</script>

<template>
  <div class="ecm-deviceBox" :class="sidebarStore.dynamicMargin">
    <div class="ecm-deviceBox__wrap">
      <div class="ecm-deviceBox__img-content" :class="backgroundClass">
        <div class="ecm-deviceBox__date">
          <span class="ecm-deviceBox__date-value">
            {{ data.lastInsert ? new Date(data.lastInsert).toLocaleDateString('cs-CZ') : '-' }}
          </span>
          <span class="ecm-deviceBox__date-time-value">
            {{
              data.lastInsert
                ? new Date(data.lastInsert).toLocaleTimeString('cs-CZ', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : '-'
            }}
          </span>
        </div>
      </div>

      <div class="ecm-deviceBox__content">
        <div class="ecm-deviceBox__header">
          {{ data.name || data.nodeName || 'Zařízení' }}
        </div>

        <div class="ecm-deviceBox__main">
          <span class="ecm-deviceBox__text">{{ data.elementName }}</span>
          <span class="ecm-deviceBox__charge-value">{{ data.lastValue }} {{ data.unit }}</span>
        </div>

        <div class="ecm-deviceBox__footer">
          <div class="ecm-deviceBox__device-button">
            <a href="#" @click.prevent="navigateToDevice">Zobrazit zařízení</a>
          </div>
        </div>
      </div>
    </div>
    <SpeedDial
      :model="settingsIcons"
      direction="down"
      :buttonClass="'p-button-rounded p-button-text'"
      class="ecm-deviceBox__settings"
    >
      <template #icon>
        <span class="material-icons ecm-deviceBox__settings-icon">settings</span>
      </template>
      <template #item="{ item }">
        <button
          class="p-speeddial-action p-button p-button-rounded"
          @click="(event) => item.command && item.command({ originalEvent: event, item })"
        >
          <span class="material-icons">{{ item.icon }}</span>
        </button>
      </template>
    </SpeedDial>
  </div>

  <Dialog
    v-model:visible="showDialog"
    header="Upravit zařízení"
    :modal="true"
    :style="{ width: '400px' }"
  >
    <div class="p-field">
      <label for="elementName">Název zařízení</label>
      <InputText id="elementName" v-model="editedElementName" class="p-inputtext-lg w-full" />
    </div>
    <template #footer>
      <Button label="Zrušit" class="p-button-text" @click="showDialog = false">
        <span class="material-icons">cancel</span> Zrušit
      </Button>
      <Button
        label="Smazat"
        class="p-button-danger"
        @click="delDeviceOrElement(data.id, data.nodeID)"
      >
        <span class="material-icons">delete</span> Smazat
      </Button>
      <Button label="Uložit" class="p-button-success" @click="saveElementName(data)">
        <span class="material-icons">save</span> Uložit
      </Button>
    </template>
  </Dialog>
</template>

<style scoped>
/* Původní styly beze změny */
.bg-electricity {
  background: url('@/components/img/elektromer.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  align-items: flex-end;
}

.bg-pv {
  background: url('@/components/img/fve.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  align-items: flex-end;
}

.bg-location {
  background-color: #e2e3e5;
}

.bg-jine {
  background: url('@/components/img/dum.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  align-items: flex-end;
}

.bg-plynoměr {
  background: url('@/components/img/plyn.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  align-items: flex-end;
}

.bg-baterky {
  background: url('@/components/img/baterie.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  align-items: flex-end;
}

.bg-white {
  background-color: rgba(255, 255, 255, 0.342);
}

.p-field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.material-icons {
  font-size: 24px;
  vertical-align: middle;
}
</style>
