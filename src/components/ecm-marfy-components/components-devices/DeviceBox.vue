<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';
import { useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { DeleteDevice, DeleteElement, UpdateElement } from '@/services/ecm-marfy/devices/deviceService';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import { useOrgTree } from '@/composables/ecm-marfy/component-aside-ts/useOrgTree';

// Props
const { data, variant } = defineProps<{
  data: any;
  variant?: string;
}>();

// Store a knihovny
const sidebarStore = useSidebarStore();
const confirm = useConfirm();
const toast = useToast();
const router = useRouter();
const store = useSelectedItemStore();
const { fetchOrgTree } = useOrgTree();

// Stav pro zobrazení dialogu a editaci názvu
const showDialog = ref(false);
const editedElementName = ref(data.elementName);

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

// Funkce pro navigaci a rozbalení stromu
async function navigateToDevice() {
  // Nastavíme selectedNodeId pro zvýraznění třídou testtest
  store.setSelectedItem('', undefined, data.nodeID); 

  // Načteme strom, pokud není načten
  if (!store.orgTree.length || store.idOfLoadedTree !== store.selectedOrgId) {
    await fetchOrgTree(store.selectedOrgId);
  }

  // Rozbalíme cestu k uzlu
  store.expandNodePath(data.nodeID);

  // Navigace na detail zařízení
  router.push({ name: 'electricitymeter-detail', params: { id: data.id } });
}

// Mazání zařízení nebo elementu
function delDeviceOrElement(elementId: number, deviceId: number) {
  const message = `Opravdu chcete smazat ${elementId != null ? 'tenhle element' : 'tohle zařízení'}?`;

  confirm.require({
    message,
    header: 'Potvrzení mazání',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Zrušit',
    rejectProps: {
      label: 'Zrušit',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Smazat',
      severity: 'danger',
    },
    accept: async () => {
      showDialog.value = false;

      const deleteResult = elementId != null ? await DeleteElement(elementId) : await DeleteDevice(deviceId);

      console.log(deleteResult);

      toast.add({ severity: 'success', summary: 'Smazáno', detail: 'Zařízení bylo smazáno', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Zamítnuto', detail: 'Mazání zrušeno', life: 3000 });
    },
  });
}

// Uložení změn názvu
async function saveElementName(editedElement: any) {
  if (editedElementName.value.trim() === '') {
    toast.add({ severity: 'error', summary: 'Chyba', detail: 'Název nemůže být prázdný', life: 3000 });
    return;
  }
  editedElement.elementName = editedElementName.value;
  await UpdateElement(editedElement);
  showDialog.value = false;
  toast.add({ severity: 'success', summary: 'Uloženo', detail: 'Název byl aktualizován', life: 3000 });
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
        </div>

        <div class="ecm-deviceBox__footer">
          <div class="ecm-deviceBox__device-button">
            <a href="#" @click.prevent="navigateToDevice">Zobrazit zařízení</a>
          </div>
        </div>
      </div>
    </div>
    <div class="ecm-deviceBox__settings" @click="showDialog = true">
      <span class="material-icons" style="font-size: 20px;">settings</span>
    </div>
  </div>

  <Dialog v-model:visible="showDialog" header="Upravit zařízení" :modal="true" :style="{ width: '400px' }">
    <div class="p-field">
      <label for="elementName">Název zařízení</label>
      <InputText id="elementName" v-model="editedElementName" class="p-inputtext-lg w-full" />
    </div>
    <template #footer>
      <Button label="Zrušit" icon="pi pi-times" class="p-button-text" @click="showDialog = false" />
      <Button label="Smazat" icon="pi pi-trash" class="p-button-danger" @click="delDeviceOrElement(data.id, data.nodeID)" />
      <Button label="Uložit" icon="pi pi-check" class="p-button-success" @click="saveElementName(data)" />
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
</style>