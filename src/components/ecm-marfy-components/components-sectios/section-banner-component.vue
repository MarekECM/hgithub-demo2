<script setup lang="ts">
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/ui/resize';
const sidebarStore = useSidebarStore();

const removeDiv = () => {
  isVisible.value = false;
};

const isVisible = ref(true);


</script>

<template>
  <section class="ecm-banner" v-if="isVisible">
      <div class="ecm-banner__content-container">
          <div class="ecm-banner__header">
              <div class="ecm-banner__dots-container">
                  <span class="ecm-banner__dot ecm-banner__dot--active"></span>
                  <span class="ecm-banner__dot ecm-banner__dot--inactive"></span>
                  <span class="ecm-banner__dot ecm-banner__dot--inactive"></span>
              </div>
              <div class="ecm-banner__title">Aplikace</div>
              <div class="ecm-banner__hero-title" :class="sidebarStore.dynamicFontsizeV1">Aplikace k dispozici na vašem zařízení</div>
          </div>
          <div class="ecm-banner__footer">
              <div class="ecm-banner__button" :class="sidebarStore.dynamicFontsizeV2">STÁHNOUT APLIKACI</div>
          </div>
      </div>
      <div class="ecm-banner__icon-container" @click="removeDiv">
          <span class="ecm-banner__icon material-icons" style="font-size:16px; color: #fff;">close</span>
      </div>
  </section>
</template>
