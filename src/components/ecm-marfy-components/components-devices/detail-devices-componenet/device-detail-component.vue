<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';

const store = useSelectedItemStore();
const route = useRoute();

onMounted(() => {
  const param = route.params.parameter;
  if (param) {
    // Převod parametru na string, protože store očekává string
    store.setSelectedItem(String(param));
  }
});
</script>

<template>
  <section class="ecm-main__wrap">
    <div class="ecm-main__container--primary">
      <div class="ecm-main__container--secondary">
        <div class="ecm-main__titleDevices">
          <span>{{ store.selectedItem }}</span>
          <div class="device-btn-container">
            <div class="device-btn-container__selection-alarms">
              <span class="device-btn-container__icon-content">
                <span class="device-btn-container__icon material-icons">construction</span>
              </span>
              <span class="device-btn-container__text">Vytvořit model zařízení</span>
            </div>
          </div>
        </div>
        <div style="width: 100%; border: 1px solid blue; height: 50px;">
          <div class="title-devices">
            Nadpis zařízení
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
