<script setup lang="ts">

import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue';
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue';
import deviceDetailComponent from '@/components/ecm-marfy-components/components-devices/detail-devices-componenet/device-detail-component.vue';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'
import { useSidebarStore } from '@/stores/ui/resize'


const store = useSelectedItemStore()
const sidebarStore = useSidebarStore()
</script>

<template>
  <Header />
  <main class="ecm-main"  :style="sidebarStore.dynamicStyles" style="border: 1px solid yellow;">
    <section class="ecm-main__wrap" >
      <div class="ecm-main__container-primary">
        <div class="ecm-main__title-devices">
           <span>{{ store.selectedItem }}</span>
        </div>
        <div class="ecm-main__title-devices">
          <span>Baterie Dalovice</span> 

        
        </div>
        <div style="display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
           width: 100%;
            margin: 0 auto;">
         <div style="background-color: #ff0000;
            color: #fff; grid-row: span 2">
          
         </div>
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
            <deviceDetailComponent />
        </div>


      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>
