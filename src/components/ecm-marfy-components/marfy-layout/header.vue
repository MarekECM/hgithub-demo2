<script setup lang="ts">
    import MainNavbar from './MainNavbar.vue';
</script>

<template>
    <header class="ecm_mainHeader">
        <MainNavbar/>
    </header>
</template>

<style setup lang="scss">

    .ecm_mainHeader {
        display: flex;
        max-width: 1655px;
        width: 100%;
        justify-content: flex-end;
        background-color: var(--body-backgroundColor);
        z-index: 2;
        position: fixed;
        padding: 0 15px;
    }


    
</style>