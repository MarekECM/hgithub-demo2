<script setup lang="ts">
//  import dynamicWebHeader from '@/components/dynamicWebComponent/dynamicWebLayout/dynamicWebHeader.vue';
</script>

<template>
    
        <dynamicWebHeader/>
        <main>
            <section class="mainContentContainerTest">

                <div class="detailDevicesContainerTest2">
                       Vizualizace Kotelna
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
                max-width: 1663px;
                width: 100%;
                min-height: 89vh;
                margin: 110px auto;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px 5px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 50px;
        }

</style>