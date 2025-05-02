<script setup lang="ts">

const logWindowWidth = () => {
    console.log(`Current window width: ${window.innerWidth}px`);
  };
  logWindowWidth();
window.addEventListener('resize', logWindowWidth);
  
</script>

<template>
    <div class="ecm-layout ecm-layout__default">
        <RouterView/>
    </div>     
</template>

