<script setup lang="ts">
import { ref } from 'vue';

const optionList = ref<HTMLElement | null>(null); 

const selectClick = () => {
  if (optionList.value) {
    optionList.value.classList.toggle('active');
    optionList.value.classList.toggle('noneActive');
  }
};

</script>

<template>
    <div class="com_selectContainer">
        <nav class="com_selectTreeNav">
            <ul>
                <li class="com_selectTree">
                    <div class="com_selectItem" @click="selectClick">
                        <span class="com_optionValue">ECM System Solutions s.r o. </span>
                        <span class="com_selectIconContainer"> <span class="material-icons testIcon" style="font-size: 19px;">keyboard_arrow_down</span></span>
                    </div>
                    <ul ref="optionList" class="com_optionList noneActive">
                        <li class="com_listItemTree">2 Firma firma firma firma firma firma firma</li>
                        <li class="com_listItemTree">3 Firma firma firma firma firma firma firma</li>
                        <li class="com_listItemTree">4 Firma firma firma firma firma firma firma</li>
                        <li class="com_listItemTree">5 Firma firma firma firma firma firma firma</li>
                        <li class="com_listItemTree">6 Firma firma firma firma firma firma firma</li>
                        <li class="com_listItemTree">7 Firma firma firma firma firma firma firma</li>
                        <li class="com_listItemTree">8 Firma firma firma firma firma firma firma</li>
                        <li class="com_listItemTree">9 Firma firma firma firma firma firma firma</li>
                        <li class="com_listItemTree">10 Firma firma firma firma firma firma firma</li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style setup lang="scss">

.com_optionValue {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 15px;
}

.com_selectContainer {
    width: 246px;
    height: 30px;
    z-index: 100;
  
    
}

.com_selectContainer nav {
    width: 100%; 
}

.com_selectContainer nav ul {
    background-color: var(--selectContainerBacground);
    list-style: none;
    overflow-y: auto;
    border-radius: 5px;
}


.com_selectItem {
    width: 100%;
    display: flex;
    height: 35px;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    align-items: center;
    position: relative;
   
}

.com_selectIconContainer {
    position: absolute;
    right: 0;
    width: 20px;
    display: flex;
    align-items: center;
   // justify-content: center;
    height: 100%;
    background-color: var(--selectContainerBacground);    
}


.com_optionList {
    position: absolute;
    overflow-x: auto;
    height: 90vh; 
    box-shadow: var(--boxShadow);
    bottom: 12px;
    left: 0;
    top: 175px;
    width: calc(100% - 5px);
}

.com_listItemTree {
    padding: 15px 25px 15px 25px;
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis; 
    cursor: pointer;
    transition: var(--transtion1);
  
    &:hover {
        background-color: var(--sideMenu-headerBacground);
        border-radius: 5px;
        color: var(--textColorhov);
        
    }
}

.noneActive {
    display: none !important;
}

.active {
    display: block !important;
}

</style>


