<script setup lang="ts">
    import dynamicWebHeaderComponent from '@/components/ecm-dynamicWeb-componenets/dynamicWeb-layout/dynamicWebHeaderComponent.vue';
</script>

<template>
    
        <dynamicWebHeaderComponent/>
        <main>
            <section class="mainContentContainerTest">

                <div class="detailDevicesContainerTest2">
                       Kogenerace
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