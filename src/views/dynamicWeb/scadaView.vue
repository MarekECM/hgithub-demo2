<script setup lang="ts">

    import dynamicWebHeaderComponent from '@/components/ecm-dynamicWeb-componenets/dynamicWeb-layout/dynamicWebHeaderComponent.vue';
</script>

<template>
    
        <dynamicWebHeaderComponent/>
        <main>
            <section class="mainContentContainerTest">

                <div class="detailDevicesContainerTest2">
                       Vizualizace SCADA
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
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.9vw;
        }

</style>