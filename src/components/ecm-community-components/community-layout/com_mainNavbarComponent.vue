<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '@/stores/resize';
import { useWindowResize } from '@/composables/gl_resizeWindow';
import { mdiAccountSearch } from '@mdi/js';
import { ref } from 'vue';
//import { moveSyntheticComments } from 'typescript';


const navBarIcon = ref<HTMLElement | null>(null);

const navBarClick = () => {
    if (navBarIcon.value) {
        navBarIcon.value.classList.toggle('active');
        navBarIcon.value.classList.toggle('noneActive');
        
  }
}

const { dynamicStyles } = useWindowResize();
const sidebarStore = useSidebarStore();

// Sledování stavu isWide z Pinia store odebraní navigace
const isWide = computed(() => sidebarStore.isWide);

</script>



<template>

<div class="headerWrap" :style="dynamicStyles">
    <div class="headercontaioner">
        <div class="ecm_marfyNavWrrap" v-if="!isWide">
            <nav class="ecm_marfyMainNavigation">
                <ul ref="navList" class="ecm_marfyMainNavigation-list">
                    <li class="ecm_primLink">
                        <RouterLink :to="{ name:'overview' , params: { parameter: 'overview' } }">Můj Marfy</RouterLink>
                        <span class="linkLine1"></span>
                    </li>
                    <li class="ecm_primLink">
                        <RouterLink :to="{ name:'community-management' , params: { parameter: 'community-management' } }">Domů</RouterLink>
                        <span class="linkLine1"></span>
                    </li>
                    <li class="ecm_primLink">
                        <RouterLink :to="{ name:'community-data' , params: { parameter: 'community-data' } }">Data</RouterLink>
                        <span class="linkLine1"></span>
                    </li>
                    <li class="ecm_primLink"> 
                        <RouterLink :to="{ name:'community-documents' , params: { parameter: 'community-documents' } }">Dokumenty</RouterLink>
                        <span class="linkLine1"></span>
                    </li>
                    <li class="ecm_primLink">
                        <RouterLink :to="{ name:'users-group-management' , params: { parameter: 'users-group-management' } }">Správa Skupin</RouterLink>
                        <span class="linkLine1"></span>
                    </li>
                    <li class="ecm_primLink">
                        <RouterLink :to="{ name:'members-management' , params: { parameter: 'members-management' } }">Správa Skupin</RouterLink>
                        <span class="linkLine1"></span>
                    </li>
                    <li class="ecm_primLink">
                        <RouterLink :to="{ name:'community-management' , params: { parameter: 'community-management' } }">Správa komunit</RouterLink>
                        <span class="linkLine1"></span>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="iconContainer">
            <nav class="ecm_secondPartNav">
                <ul class="ecm_secondPartNav-list">
                    <li class="evmRingBc">
                        <span class="material-icons" style="font-size: 26px;">settings</span>
                    </li>
                    <li class="evmRingBc">
                        <span class="material-icons" style="font-size: 26px;">home_repair_service</span>
                    </li>
                    <li class="evmRingBc" @click="navBarClick">
                        <span class="material-icons" style="font-size: 26px;">more_vert</span>
                        <ul ref="navBarIcon" class="wwwtttwwww testwwww noneActive">
                       
                            <li>
                                <span class="myIcontest"><svg :viewBox="'0 0 24 24'" width="48" height="48"><path :d="mdiAccountSearch" /></svg></span>
                                <span class="textQ">poslední</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

</div>


</template>

<style setup lang="scss">
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}

.testwwww {
    width: 300px;
    background-color: rgb(243, 243, 243);
    position: absolute;
    flex-direction: column;
    height: calc(100vh - 90px);
    z-index: 600;
    top: 72px;
    overflow-y: auto;
    overflow-x: hidden;
    right: 0px;
    border-radius: 0 20px 20px 20px;
    padding-top: 10px;
}

.ecm_secondPartNav-list {
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    
}

.trasss {
    display: inline-flex;
}

.wwwtttwwww {
    display: flex;
}

.testwwww li {
    height: 35px;
    border-radius: 5px;

    &:hover {
        background-color: blue;
    }
}

.ecm_NavListItem_aside {
    height: 35px;
}



.headerWrap {
    width: 100%;
    max-width: 1400px;
    display: flex;
    align-items: flex-end;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 15px;
    background-color: var(--body-backgroundColor);
}

.headercontaioner {
    width: 100%;
    display: flex;
    height: 72px;
    background-color: var(--navbar-backgroundColor);
    border-radius: 20px;
}

.ecm_marfyNavWrrap {
    width: calc(100% - 300px);
    height: 100%;
    display: flex;
}

.headercontaioner .ecm_marfyMainNavigation {
    display: flex;
    justify-content: center;
    align-items: center; 
}


.headercontaioner .ecm_marfyMainNavigation ul {
    display: inline-flex;
    width: 100%;
    max-width: 1000px;
    height: 100%;
    justify-content: space-around;
    padding: 0px 5px;
}

.headercontaioner .ecm_marfyMainNavigation ul li a {
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    white-space: nowrap;
}

.headercontaioner .ecm_marfyMainNavigation ul li {
    list-style: none;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: relative;
    cursor: pointer;
    text-align: center;
    align-items: center;
    transition: var(--transtion3);
    margin: 0 15px;
  
    &:hover a {
        color: var(--navbar-hover-color);
    }

    &:hover .linkLine1 {
        background-color: var(--navbar-text-decorationLinkColor1);
    }
}

.iconContainer {
    display: flex;
    width: 100%;
    max-width: 300px;
    position: absolute;
    right: 15px;
    height: 72px;
}

.iconContainer .ecm_secondPartNav {
    display: flex;
    width: 100%;
    background-color: var(--navbar-backgroundColor);
    border-radius: 20px;
    justify-content: space-around;
}




.iconContainer .ecm_secondPartNav ul li {
    list-style: none;
    display: flex;
    cursor: pointer;
    align-items: center;
    transition: var(--transtion3);
    margin: 0 15px;
}

 .linkLine1 {
    position: absolute;
    bottom: 0;
    border-radius: 10px 10px 0px 0px;
    width: calc(100% + 10px);
    height: 6px;
    transition: var(--transtion3);
 }

.linkLine2 {
    @extend .linkLine1;
    background-color: var(--navbar-text-decorationLinkColor2);
}

.ecm_primLink a {
    color: var(--colorLink);
}

.ecm_secLink a {
    color: var(--navbar-text-secundaryColor);
}

@media(max-width: 1574px) {
    .ecm_marfyNavWrrap {
        display: none;
    }
}

</style>


