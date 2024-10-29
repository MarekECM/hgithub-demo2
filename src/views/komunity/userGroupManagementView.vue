<script setup lang="ts">
    // import comunitesHeader from '@/components/comunitesMarfy-components/comunitesLayout/comunitesHeader.vue'
    // import comunitesNavTree from '@/components/comunitesMarfy-components/comunitesLayout/comunitesNavTree.vue'
</script>

<template>
  <comunitesHeader />
  <main>
    <section class="mainContentContainer">
      <div class="detailDevicesContainerTest">Správa skupin</div>
    </section>
  </main>
  <comunitesNavTree />
</template>

<style setup lang="scss">
    .mainContentContainer {
      min-height: calc(100vh - 300px);
    }

    .detailDevicesContainerTest {
        max-width: 1290px;
        width: 100%;
        min-height: 89vh;
        margin: 30px auto;
        box-shadow:
            rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
            rgba(0, 0, 0, 0.05) 0px 4px 6px 5px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
    }
</style>
