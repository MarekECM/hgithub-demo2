<script setup lang="ts">
    import dynamicWebHeader from '@/components/ecm-dynamicWeb-componenets/dynamicWeb-layout/dynamicWeb-header.vue';
</script>

<template>
    
        <dynamicWebHeader/>
        <main>
            <section class="mainContentContainerTest">

                <div class="detailDevicesContainerTest2">
                       Kotelna
                </div>
                
            </section>    
        </main>
        <navTree/>

</template>

<style setup lang="scss">



        .mainContentContainerTest {
            width: 100%;
            right: auto;
        }


        .detailDevicesContainerTest2 {
            color: white;
        }

</style>