<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';
import { useDevicesStore } from '@/stores/ecm-marfy/devices/devicesStore';
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData';
import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue';
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue';
import deviceBox from '@/components/ecm-marfy-components/components-devices/DeviceBox.vue';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import {useAddMeasurementForm} from "@/composables/ecm-marfy/component-data-ts/useMeasurements";
import DynamicFormDialog from "@/composables/global/DynamicFormDialog.vue";
import {useToast} from "primevue/usetoast";

const store = useSelectedItemStore();
const sidebarStore = useSidebarStore();
const devicesStore = useDevicesStore();
const toast = useToast();
const addMeasurementForm = useAddMeasurementForm(toast);
function handleDashboardData(data: DeviceData[]) {
  devicesStore.setDevices(data);
}

// Nepoužíváme už žádné localStorage, protože používáme Pinia

// Pokud chceš, můžeš zde načítat data z API nebo jiného zdroje,
// ale zatím necháme store prázdný po reloadu.
onMounted(() => {
  // Můžeš tu načíst data např. z API, nebo pouze inicializovat store, pokud chceš.
});
</script>

<template>
  <Header />
  <main class="ecm-main" :style="sidebarStore.dynamicStyles">
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <div class="ecm-main__titleDevices">{{ store.selectedItem }}</div>
        <div v-if="devicesStore.devices.length">
          <template v-for="device in devicesStore.devices" :key="device.nodeID">
            <deviceBox :data="device" :variant="device.deviceType.name" />
          </template>
        </div>
        <div v-else>
          <div class="device-empty-info">Vyberte uzel pro zobrazení zařízení.</div>
        </div>
      </div>
    </section>
  </main>
  <NavtreeMarfy @dashboardData="handleDashboardData" />
  <DynamicFormDialog
      v-model:showDialog="addMeasurementForm.showEditDialog.value"
      :schema="addMeasurementForm.editSchema.value"
      @submit="addMeasurementForm.handleSubmit"
      :dialog-name="addMeasurementForm.formName"
      :form-model-name="addMeasurementForm.formModelName"
  />
</template>
