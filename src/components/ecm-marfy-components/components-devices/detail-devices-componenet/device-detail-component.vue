<script setup lang="ts">

import { useSelectedItemStore } from '@/stores/useSelectedItemStore'

const store = useSelectedItemStore()


</script>


<template>
      

              <section class="ecm-main__wrap">
                     <div class="ecm-main__container--primary">
                            <div class="ecm-main__container--secondary">
                            <div class="ecm-main__titleDevices">
                            <span>{{ store.selectedItem }}</span>
                            <div class="alarm-btn-container">
                                   <div class="alarm-btn-container__selection-alarms">
                                   <span class="alarm-btn-container__icon-content">
                                   <span class="alarm-btn-container__icon material-icons">construction
                                   </span>
                                   </span>
                                   <span class="alarm-btn-container__text">Vytvořit model zařízení</span>  
                                   </div>
                            </div>
                            </div>
                            </div>
                     </div>
              </section>
       

</template>

