<script setup lang="ts">
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";

const logWindowWidth = () => {
    console.log(`Current window width: ${window.innerWidth}px`);
  };
  logWindowWidth();
window.addEventListener('resize', logWindowWidth);
  
</script>

<template>
    <div class="ecm-layout ecm-layout__default">
        <RouterView/>
      <ConfirmDialog>
      </ConfirmDialog>
      <Toast />
    </div>     
</template>

