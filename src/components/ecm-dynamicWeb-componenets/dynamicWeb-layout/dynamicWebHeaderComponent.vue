<script setup lang="ts">
    import mainNavbar from './dynamicWebNavbarComponent.vue';
</script>

<template>
    <header class="dw_mainHeader">
        <mainNavbar/>
    </header>
</template>

<style setup lang="scss">

    .dw_mainHeader {
        display: flex;
        max-width: 1655px;
        width: 100%;
        background-color: var(--body-backgroundColor);
        z-index: 2;
        position: fixed;
        padding: 0 0 0 15px;
    }


    
</style>