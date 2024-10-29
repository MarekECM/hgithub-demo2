<script lang="ts">
// import { defineComponent, onMounted } from 'vue';
// import { useSidebarStore } from '@/stores/resize';
// import MainSelect from '../components-tree/MainSelect.vue';


// export default defineComponent({
//     setup() {
//         const sidebarStore = useSidebarStore();

//         onMounted(() => {
//             const resize = document.querySelector('.ecm_resize') as HTMLElement;
//             const sidebar = document.querySelector('.ecm_asideContainer') as HTMLElement;

//             if (resize && sidebar) {
//                 initResizeFn(resize, sidebar);
//             } else {
//               //  console.error("Elementy .ecm_resize nebo .ecm_asideContainer nebyly nalezeny.");
//             }
//         });

//         function initResizeFn(resize: HTMLElement, sidebar: HTMLElement): void {
//             let x: number;
//             let w: number;

//             function rs_mousedownHandler(e: MouseEvent): void {
//                 x = e.clientX;

//                 const sbWidth = window.getComputedStyle(sidebar).width;
//                 w = parseInt(sbWidth, 10);

//                 document.addEventListener('mousemove', rs_mousemoveHandler);
//                 document.addEventListener('mouseup', rs_mouseupHandler);
//             }

//             function rs_mousemoveHandler(e: MouseEvent): void {
//                 const dx = e.clientX - x;
//                 const cw = w + dx;

//                 if (cw >= 300) { // Zajištění minimální šířky sidebaru
//                     sidebar.style.width = `${cw}px`;
//                     sidebarStore.setWidth(cw); // Aktualizuj šířku ve store
//                    // console.log("Updated Sidebar Width:", sidebarStore.width); // Log pro kontrolu
//                 }
//             }

//             function rs_mouseupHandler(): void {
//                 document.removeEventListener('mouseup', rs_mouseupHandler);
//                 document.removeEventListener('mousemove', rs_mousemoveHandler);
//             }

//             resize.addEventListener('mousedown', rs_mousedownHandler);
//         }

//         return {};
//     }
// });
</script>



<template>
    <div></div>
    <!-- <aside class="ecm_asideContainer">
        <div class="headerAside">
            <div class="logoContainerAside">

            </div>
            <div class="selectContainerAside">
                <MainSelect/>
            </div>
            <span class="headerItemCube"></span>
        </div>
        <div class="ecmNavTreeContainer">
          <ul class="ecm_navTreeMainList">
           <li class="ecm_NavTreeMainItem">
                <details class="ecm_navTreeMainDetails" open>
                    <summary class="ecm_navTreeSummaryContainer">
                        <div class="ecm_itemTreeWrap">
                            <span class="ecm_navTreeIconContainerArrow">
                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                            </span>
                            <div class="ecm_treeItemContainer">
                                <span class="ecm_navTreeIconContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="testIcon2" viewBox="0 0 512 512"><path d="M256 56c110.5 0 200 89.5 200 200 0 110.5-89.5 200-200 200-110.5 0-200-89.5-200-200 0-110.5 89.5-200 200-200m0-48C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 168c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80z"/></svg>
                                </span>
                                <span class="ecm_navTree_textContent">
                                    ECM System Solutions s.r.o. s.r.o.
                                </span>
                            </div>
                        </div>
                    </summary>
                    <ul class="ecm_navTree-List-2">
                        <li class="ecm_NavTree-Item-2">
                            <details class="ecm_navTree-Details-2">
                                <summary class="ecm_navTreeSummaryContainer">
                                    <div class="ecm_itemTreeWrap2">
                                        <span class="ecm_navTreeIconContainerArrow2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                        </span>
                                        <div class="ecm_treeItemContainer">
                                            <span class="ecm_navTree_textContent">
                                                Opava Suché Lazce
                                            </span>
                                        </div>
                                    </div>
                                </summary>
                                <ul class="ecm_navTree-List-3">
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                        Výrobní hala
                                                    </span> 
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Staré zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                       Administrativní budova na louce
                                                    </span> 
                                                </div>

                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                        Strojírna vedle budovy
                                                    </span> 
                                                </div>

                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li class="ecm_NavTree-Item-2">
                            <details class="ecm_navTree-Details-2">
                                <summary class="ecm_navTreeSummaryContainer">
                                    <div class="ecm_itemTreeWrap2">
                                        <span class="ecm_navTreeIconContainerArrow2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                        </span>
                                        <div class="ecm_treeItemContainer">
                                            <span class="ecm_navTree_textContent">
                                                Hradec Králove
                                            </span>
                                        </div>
                                    </div>
                                </summary>
                                <ul class="ecm_navTree-List-3">
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                        Výrobní hala
                                                    </span> 
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                       Administrativní budova na louce
                                                    </span> 
                                                </div>

                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                        Strojírna vedle budovy
                                                    </span> 
                                                </div>

                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li class="ecm_NavTree-Item-2">
                            <details class="ecm_navTree-Details-2">
                                <summary class="ecm_navTreeSummaryContainer">
                                    <div class="ecm_itemTreeWrap2">
                                        <span class="ecm_navTreeIconContainerArrow2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                        </span>
                                        <div class="ecm_treeItemContainer">
                                            <span class="ecm_navTree_textContent">
                                                Třinec pod Kanadou
                                            </span>
                                        </div>
                                    </div>
                                </summary>
                                <ul class="ecm_navTree-List-3">
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                        Výrobní hala
                                                    </span> 
                                                </div>

                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                       Administrativní budova na louce
                                                    </span> 
                                                </div>

                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-3">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap3">
                                                    <span class="ecm_navTreeIconContainer2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                    </span>
                                                    <span class="ecm_navTree_textContent">
                                                        Strojírna vedle budovy
                                                    </span> 
                                                </div>

                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap3">
                                                            <span class="ecm_navTreeIconContainer2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="testIcon" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg>
                                                            </span>
                                                            <span class="ecm_navTree_textContent">
                                                               Nové zařízení
                                                            </span> 
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         FVE
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Elektroměr
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap-5">
                                                                    <span class="ecm_navTree_textContent">
                                                                         Baterie
                                                                    </span> 
                                                               </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </details>
           </li>
          </ul>
        </div>

        <div class="ecm_asaidFotter">
            ECM marfy Verze 0
        </div>
        <div class="ecm_resize"></div>

    </aside> -->
</template>

<style setup lang="scss">

//  .ecm_asideContainer {
//     width: 300px;
//   //  max-width: 300px; // blblo u resize 
//     min-height: 100vh;
//     background-color: var(--sideMenu-itemList-background);
//     position: absolute;
//     top: 0;
//     position: fixed;
//     display: flex;
//     flex-direction: column;
//     z-index: 4;
//  }

//  .headerAside {
//     width: 100%;
//     height: 123px;
//    // background-color: var(--sideMenu-headerBacground);
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     position: relative;
//     overflow: hidden;
    
//  }

//  .headerItemCube {
//     position: absolute;
//     width: 232px;
//     height: 232px;
//     background-color: red;
//     border-radius: 35px;
//     transform: rotate(45deg) translate(-30%, -70%);
//     top: 90%;
 

//  }


//  .logoContainerAside {
//     display: flex;
//     width: 100%;
//     height: 60px;
//     justify-content: center;
//     align-items: center;
//  }

//  .selectContainerAside {
//     @extend .logoContainerAside;
//  }

//  //**************************** */

//  .ecm_navTreeMainList   {
//   display: flex;
//   --spacing: 25px;
//   --radius: 80px;
//   width: 100%;
//   height: calc(100vh - 200px);
//   flex-direction: column;
//   overflow-y: auto;
//   overflow-x: hidden;
//  // margin-right: 15px;
// }


// .ecmNavTreeContainer {
//    // width: 300px;
//     display: flex;
//     overflow-y: auto;
// }

// .testIcon {
//   width: 8px;
//   fill: red;
// }

// .testIcon2 {
//   width: 26px;
//   fill: red;  
// }

// .ecm_navTreeSummaryContainer {
//   display: flex;
//   align-items: center;
//   padding: 0 15px;
//   position: relative;
// }


// .ecm_itemTreeWrap {
//     position: absolute;
//     height: 35px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 10px;
//     border-radius: 5px;

//     &:hover {
//         background-color: rgba(255, 0, 0, 0.274);
        
//     }
   
// }

// .ecm_navTreeIconContainerArrow {
//     display: flex
// }

// .ecm_navTreeIconContainerArrow2 {
//     display: flex;
//     margin: 0 8px;
// }

// .ecm_navTree_textContent {
//     text-align: center;
//     display: flex;
//     height: 35px;
//     white-space: nowrap;
//     align-items: center;
//     justify-content: flex-end;
// }

// .ecm_navTreeIconContainer {
//     height: 100%;
//     padding: 0 10px;
//     display: flex;
// }

// .ecm_treeItemContainer {
//     display: flex;
//     width: 245px;
//     overflow: hidden;
//     align-items: center;
// }


// .ecm_navTreeMainList li {
//   display: flex;
//   position: relative;
//   padding-left: calc(2 * var(--spacing) - var(--radius) - 15px);
//   padding-top: 10px;
//   list-style: none;
// }

// .ecm_navTreeMainList ul {
//   margin-left: calc(var(--radius) - var(--spacing));
//   padding-left: 0;
// }

// .ecm_navTree-List-2 ul {
//     margin-left: calc(var(--radius) - var(--spacing));
//     margin-left: 25px;
// }

// .ecm_navTree-List-3 ul {
//     margin-left: 28px;
// }

// .ecm_navTreeMainList ul li {
//   border-left: 2px solid #ddd;
//   color: #4B5768;
// }

// .ecm_navTreeMainList ul li:last-child {
//   border-color: transparent;
// }

// .ecm_navTreeMainList ul li::before {
//     content: "";
//     display: flex;
//     position: absolute;
//     top: calc(var(--spacing) / -1);
//     left: -2px;
//     width: calc(var(--spacing) + -7px);
//     height: calc(var(--spacing) - -2px);
//     border: solid #ddd;
//     border-width: 0 0 2px 2px;
//     margin-top: 25px;
// }

// .ecm_navTreeMainList summary {
//   display: flex;
//   cursor: pointer;
//   width: 100%;
//   height: 35px;
// }

// .ecm_navTreeMainList summary::marker,
// .ecm_navTreeMainList summary::-webkit-details-marker {
//   display: none;
// }


// .ecm_navTreeMainList details[open] > summary::before {
//   background-position: calc(-2 * var(--radius)) 0;
// }



// .ecm_itemTreeWrap2 {
//    width: 73%;
//    display: flex;
//   // padding-right: 10px;
//    border-radius: 5px;
//   &:hover {
//         background-color: rgba(255, 0, 0, 0.274);
        
//     }
// }

// .ecm_itemTreeWrap3 {
//     display: flex;
//     //width: 150px;
//     //padding-right: 10px;
//     border-radius: 5px;
//     //overflow: hidden;
//     text-align: right;

//     &:hover {
//         background-color: rgba(255, 0, 0, 0.274);
        
//     }
// }

// .ecm_itemTreeWrap-5 {
//     width: 100%;
//     display: flex;
//     padding-left: 10px;
//     border-radius: 5px;
//     margin-left: -20px;

//     &:hover {
//         background-color: rgba(255, 0, 0, 0.274);
//     }
// } 

// .ecm_navTree-List-5 {
//     --spacing: 25px;
//     --radius: 10px;
// }

// .ecm_navTree-List-5 li {
//   padding-left: calc(2 * var(--spacing) - var(--radius) - 1px);
//   cursor: pointer;
// }

// .ecm_navTree-List-5 li::before {
//     width: calc(var(--spacing) + -8px) !important;
// }

// .ecm_navTreeIconContainer2 {
//     display: flex;
//     margin: 0 10px;
// }

// .ecm_resize {
//     width: 5px;
//     height: 100%;
//     position: absolute;
//     right:0px;
//     cursor: col-resize;

//     &:hover {
//         background-color: #ddd;
//     }
// }



// .ecmNavTreeContainer > ::-webkit-scrollbar {
//   position: absolute;  
//   width: 10px;
//   border: 1px solid blue;
// }

// /* Track */
// .ecmNavTreeContainer > ::-webkit-scrollbar-track {
//   box-shadow: inset 0 0 5px grey; 
//   border-radius: 10px;
 
// }
 
// /* Handle */
// .ecmNavTreeContainer > ::-webkit-scrollbar-thumb {
//   background: red; 
//   border-radius: 10px;
// }

// /* Handle on hover */
// .ecmNavTreeContainer > ::-webkit-scrollbar-thumb:hover {
//   background: #b30000; 
// }
</style>