<script setup lang="ts">
import Header from '@/components/ecm-marfy-components/marfy-layout/header.vue'
import batteryDeviceDetail from '@/components/ecm-marfy-components/components-devices/detail-devices-componenet/battery-device-detail.vue'
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/NavtreeMarfy.vue'
</script>

<template>
  <Header />
  <main>
    <section class="mainContentContainer">
      <div class="detailDevicesContainer">
        <batteryDeviceDetail />
      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>

<style setup lang="scss">
.mainContentContainer {
  min-height: calc(100vh - 300px);
}

.detailDevicesContainer {
  max-width: 1290px;
  width: 100%;
  min-height: 89vh;
  margin: 30px auto;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px 5px;
  border-radius: 20px;
}
</style>
