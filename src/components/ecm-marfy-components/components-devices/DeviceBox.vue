<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '@/stores/resize';
import { RouterLink } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

// Props
const { data, variant } = defineProps<{
  data: any;
  variant?: string; // "Elektroměr" | "Fotovoltaika" | "Lokalita"
}>();

// Store a knihovny
const sidebarStore = useSidebarStore();
const confirm = useConfirm();
const toast = useToast();


// Výpočet třídy pozadí podle typu zařízení
const backgroundClass = computed(() => {


  switch (variant) {
    case 'Bateriové úložiště':
      return 'bg-baterky';
    case 'Plynoměr':
      return 'bg-plynoměr';
    case 'Elektroměr':
      return 'bg-electricity';
    case 'Fotovoltaika':
      return 'bg-pv';
    case 'Lokalita':
      return 'bg-location';
    case 'Jiné':
      return 'bg-jine';
    default:
      return '';
  }
});

// Mazání zařízení nebo elementu
function delDeviceOrElement(elementId: number, deviceId: number) {
  const message = "Opravdu chcete smazat " + (elementId != null ? "tenhle element" : "tohle zařízení") + "?";
  
  confirm.require({
    message,
    header: 'Potvrzení mazání',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Zrušit',
    rejectProps: {
      label: 'Zrušit',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Smazat',
      severity: 'danger'
    },
    accept: () => {
      console.log("DELETE");
      // TODO: Zavolej mazací funkci
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Zamítnuto', detail: 'Mazání zrušeno', life: 3000 });
    }
  });
}
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
            {{ data.lastInsert ? new Date(data.lastInsert).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) : '-' }}
          </span>
        </div>
      </div>

      <div class="ecm-deviceBox__content">
        <div class="ecm-deviceBox__header">
          {{ data.nodeName || 'Zařízení' }}
        </div>

        <div class="ecm-deviceBox__main">
          <span class="ecm-deviceBox__text">{{ data.elementName }}</span>
          <span class="ecm-deviceBox__charge-value">{{ data.lastValue }} {{ data.unit }}</span>

          <!-- Skrytá akční tlačítka -->
          <div style="display: none;">
            <div style="display: flex; justify-content: space-evenly;">
              <button class="ecm-deviceBox__device-button" @click="delDeviceOrElement(data.id, data.nodeID)">
                Smazat
              </button>
              <button class="ecm-deviceBox__device-button">
                Upravit
              </button>
            </div>
          </div>
        </div>

        <div class="ecm-deviceBox__footer">
          <div class="ecm-deviceBox__device-button">
            <RouterLink :to="{ name: 'electricitymeter-detail', params: { id: data.id } }">
              Zobrazit zařízení <span class="material-icons" style="font-size: 20px;">settings</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      align-items: flex-end;
}

.bg-white {
  background-color: rgba(255, 255, 255, 0.342);
}
</style>




