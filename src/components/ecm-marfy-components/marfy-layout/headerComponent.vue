<script setup lang="ts">
    import mainNavbar from './mainNavbarComponent.vue';
</script>

<template>
    <header class="ecm_mainHeader">
        <mainNavbar/>
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
        padding: 0 0 0 15px;
    }


    
</style>