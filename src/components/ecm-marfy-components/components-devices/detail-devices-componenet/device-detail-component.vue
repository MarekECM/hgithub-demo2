<script setup lang="ts">

import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'

const store = useSelectedItemStore()


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
                                   <span class="device-btn-container__icon material-icons">construction
                                   </span>
                                   </span>
                                   <span class="device-btn-container__text">Vytvořit model zařízení</span>  
                                   </div>
                            </div>

                            </div>
                            </div>
                     </div>
              </section>
       

</template>

