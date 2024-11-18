<script setup lang="ts">
import {onMounted } from 'vue';
import mainSelectW from '@/components/ecm-marfy-components/components-tree/mainSelectComponent.vue'; // Import Vue komponenty
import { useSidebarStore } from '@/stores/resize';

// Přístup k Pinia store
const sidebarStore = useSidebarStore();

function initResizeFn(resize: HTMLElement, sidebar: HTMLElement, treeItems: NodeListOf<HTMLElement>): void {
  let x: number;
  let w: number;

  // Minimální a maximální šířka sidebaru
  const minWidth = 300;
  const maxWidth = 1330;

  // Rozdíl mezi sidebar a tree item, který určuje relativní šířku
  const sidebarToTreeItemDiff = 50;

  // Společná funkce pro začátek přetahování/dotýkání
  function startResize(clientX: number): void {
    x = clientX;
    const sbWidth = window.getComputedStyle(sidebar).width;

    w = parseInt(sbWidth, 10);

    // Přidání událostí myši i dotyku
    document.addEventListener('mousemove', rs_mousemoveHandler);
    document.addEventListener('mouseup', rs_mouseupHandler);
    document.addEventListener('touchmove', rs_touchmoveHandler);
    document.addEventListener('touchend', rs_touchendHandler);
  }

  // Handler pro pohyb myši
  function rs_mousemoveHandler(e: MouseEvent): void {
    moveResize(e.clientX);
  }

  // Handler pro dotykový pohyb
  function rs_touchmoveHandler(e: TouchEvent): void {
    moveResize(e.touches[0].clientX);
  }

  // Společná funkce pro pohyb (myší i dotykem)
  function moveResize(clientX: number): void {
    const dx = clientX - x;
    const cw = w + dx;

    // Zajisti minimální a maximální šířku sidebaru
    if (cw >= minWidth && cw <= maxWidth) {
      sidebar.style.width = `${cw}px`;
      sidebarStore.setWidth(cw); // Aktualizuj šířku ve store

      // Pro všechny elementy s třídou .ecm_treeItemContainer
      treeItems.forEach((treeItem) => {
        // Šířka treeItem bude odvozena od šířky sidebaru
        const treeItemWidth = cw - sidebarToTreeItemDiff;
        if (treeItemWidth > 0) {
          treeItem.style.width = `${treeItemWidth}px`;
        }
      });
    }
  }

  // Handler pro uvolnění tlačítka myši
  function rs_mouseupHandler(): void {
    stopResize();
  }

  // Handler pro ukončení dotyku
  function rs_touchendHandler(): void {
    stopResize();
  }

  // Společná funkce pro ukončení přetahování/dotýkání
  function stopResize(): void {
    // Odblokuj výběr textu po uvolnění tlačítka myši nebo dotyku
    document.body.style.userSelect = '';

    // Odebrání událostí myši i dotyku
    document.removeEventListener('mousemove', rs_mousemoveHandler);
    document.removeEventListener('mouseup', rs_mouseupHandler);
    document.removeEventListener('touchmove', rs_touchmoveHandler);
    document.removeEventListener('touchend', rs_touchendHandler);
  }

  // Handler pro začátek přetahování myší
  function rs_mousedownHandler(e: MouseEvent): void {
    // Zablokuj výběr textu
    document.body.style.userSelect = 'none';
    startResize(e.clientX);
  }

  // Handler pro začátek přetahování dotykem
  function rs_touchstartHandler(e: TouchEvent): void {
    // Zablokuj výběr textu
    document.body.style.userSelect = 'none';
    startResize(e.touches[0].clientX);
  }

  // Přidání event listenerů na resize element
  resize.addEventListener('mousedown', rs_mousedownHandler);
  resize.addEventListener('touchstart', rs_touchstartHandler);
}

// Použití onMounted pro inicializaci po načtení komponenty
onMounted(() => {
  const resize = document.querySelector('.ecm_resize') as HTMLElement;
  const sidebar = document.querySelector('.ecm_asideContainer') as HTMLElement;
  const treeItems = document.querySelectorAll('.ecm_treeItemContainer') as NodeListOf<HTMLElement>;

  if (resize && sidebar && treeItems.length > 0) {
    // Nastavení šířky sidebaru na uloženou šířku
    sidebar.style.width = `${sidebarStore.width}px`;

    // Nastavení šířky pro všechny .ecm_treeItemContainer elementy podle šířky sidebaru
    treeItems.forEach((treeItem) => {
      const initialSidebarWidth = sidebarStore.width;
      const treeItemWidth = initialSidebarWidth - 50; // Rozdíl mezi sidebar a tree item
      treeItem.style.width = `${treeItemWidth}px`;
    });

    initResizeFn(resize, sidebar, treeItems);
  } else {
    console.error("Elementy .ecm_resize, .ecm_asideContainer nebo .ecm_treeItemContainer nebyly nalezeny.");
  }
});


</script>



<template>
    <aside class="ecm_asideContainer">
        <div class="headerAside">
            <div class="logoContainerAside">
                
            </div>
            <div class="selectContainerAside">
               <mainSelectW/>
            </div>
        </div>
        <div class="ecmNavTreeContainer">
          <ul class="ecm_navTreeMainList">
           <li class="ecm_NavTreeMainItem">
                <details class="ecm_navTreeMainDetails" open>
                    <summary class="ecm_navTreeSummaryContainer">
                        <div class="ecm_itemTreeWrap">
                            <span class="ecm_navTreeIconContainerArrow">
                              <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                            </span>
                            <div class="ecm_treeItemContainer">
                                <span class="ecm_navTreeIconContainer">
                                    <span class="material-icons testIcon2" style="font-size: 26px;">adjust</span>
                                </span>
                                <span class="ecm_navTree_textContent">    
                                    ECM System Solutions s.r.o.
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
                                          <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                        </span>
                                        <div class="ecm_treeItemContainer">
                                            <span class="ecm_navTree_textContent">
                                                První skupina
                                            </span>
                                        </div>
                                    </div>
                                </summary>
                                <ul class="ecm_navTree-List-3">
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-2">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap2">
                                                    <span class="ecm_navTreeIconContainerArrow2">
                                                        <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                    </span>
                                                    <div class="ecm_treeItemContainer">
                                                        <span class="ecm_navTree_textContent">
                                                            Nějaká budova
                                                        </span>
                                                    </div>
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap2">
                                                            <span class="ecm_navTreeIconContainerArrow2">
                                                            <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                            </span>
                                                            <div class="ecm_treeItemContainer">
                                                                <span class="ecm_navTree_textContent">
                                                                    Budova
                                                                </span>
                                                            </div>
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                        FVE
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">

                                                                <div class="ecm_treeItemContainer">
                                                                    <span class="ecm_navTree_textContent">
                                                                    Elektroměr
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                            Baterie
                                                                        </span>
                                                                    </div>
                                                                  </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-2">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap2">
                                                    <span class="ecm_navTreeIconContainerArrow2">
                                                        <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                    </span>
                                                    <div class="ecm_treeItemContainer">
                                                        <span class="ecm_navTree_textContent">
                                                            Nějaká budova
                                                        </span>
                                                    </div>
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap2">
                                                            <span class="ecm_navTreeIconContainerArrow2">
                                                            <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                            </span>
                                                            <div class="ecm_treeItemContainer">
                                                                <span class="ecm_navTree_textContent">
                                                                    Budova
                                                                </span>
                                                            </div>
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                        FVE
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">

                                                                <div class="ecm_treeItemContainer">
                                                                    <span class="ecm_navTree_textContent">
                                                                    Elektroměr
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                            Baterie
                                                                        </span>
                                                                    </div>
                                                                  </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-2">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap2">
                                                    <span class="ecm_navTreeIconContainerArrow2">
                                                        <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                    </span>
                                                    <div class="ecm_treeItemContainer">
                                                        <span class="ecm_navTree_textContent">
                                                            Nějaká budova
                                                        </span>
                                                    </div>
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap2">
                                                            <span class="ecm_navTreeIconContainerArrow2">
                                                            <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                            </span>
                                                            <div class="ecm_treeItemContainer">
                                                                <span class="ecm_navTree_textContent">
                                                                    Budova
                                                                </span>
                                                            </div>
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                        FVE
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">

                                                                <div class="ecm_treeItemContainer">
                                                                    <span class="ecm_navTree_textContent">
                                                                    Elektroměr
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                            Baterie
                                                                        </span>
                                                                    </div>
                                                                  </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-2">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap2">
                                                    <span class="ecm_navTreeIconContainerArrow2">
                                                        <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                    </span>
                                                    <div class="ecm_treeItemContainer">
                                                        <span class="ecm_navTree_textContent">
                                                            Nějaká budova
                                                        </span>
                                                    </div>
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap2">
                                                            <span class="ecm_navTreeIconContainerArrow2">
                                                            <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                            </span>
                                                            <div class="ecm_treeItemContainer">
                                                                <span class="ecm_navTree_textContent">
                                                                    Budova
                                                                </span>
                                                            </div>
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                        FVE
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">

                                                                <div class="ecm_treeItemContainer">
                                                                    <span class="ecm_navTree_textContent">
                                                                    Elektroměr
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                            Baterie
                                                                        </span>
                                                                    </div>
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
                                          <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                        </span>
                                        <div class="ecm_treeItemContainer">
                                            <span class="ecm_navTree_textContent">
                                               Druhá skupina
                                            </span>
                                        </div>
                                    </div>
                                </summary>
                                <ul class="ecm_navTree-List-3">
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-2">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap2">
                                                    <span class="ecm_navTreeIconContainerArrow2">
                                                        <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                    </span>
                                                    <div class="ecm_treeItemContainer">
                                                        <span class="ecm_navTree_textContent">
                                                            Nějaká budova
                                                        </span>
                                                    </div>
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap2">
                                                            <span class="ecm_navTreeIconContainerArrow2">
                                                            <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                            </span>
                                                            <div class="ecm_treeItemContainer">
                                                                <span class="ecm_navTree_textContent">
                                                                    Budova
                                                                </span>
                                                            </div>
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                        FVE
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">

                                                                <div class="ecm_treeItemContainer">
                                                                    <span class="ecm_navTree_textContent">
                                                                    Elektroměr
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                            Baterie
                                                                        </span>
                                                                    </div>
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
                                          <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                        </span>
                                        <div class="ecm_treeItemContainer">
                                            <span class="ecm_navTree_textContent">
                                                Třetí skupina
                                            </span>
                                        </div>
                                    </div>
                                </summary>
                                <ul class="ecm_navTree-List-3">
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-2">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap2">
                                                    <span class="ecm_navTreeIconContainerArrow2">
                                                        <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                    </span>
                                                    <div class="ecm_treeItemContainer">
                                                        <span class="ecm_navTree_textContent">
                                                            Nějaká budova
                                                        </span>
                                                    </div>
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap2">
                                                            <span class="ecm_navTreeIconContainerArrow2">
                                                            <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                            </span>
                                                            <div class="ecm_treeItemContainer">
                                                                <span class="ecm_navTree_textContent">
                                                                    Budova
                                                                </span>
                                                            </div>
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                        FVE
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">

                                                                <div class="ecm_treeItemContainer">
                                                                    <span class="ecm_navTree_textContent">
                                                                    Elektroměr
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                            Baterie
                                                                        </span>
                                                                    </div>
                                                                  </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-2">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap2">
                                                    <span class="ecm_navTreeIconContainerArrow2">
                                                        <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                    </span>
                                                    <div class="ecm_treeItemContainer">
                                                        <span class="ecm_navTree_textContent">
                                                            Nějaká budova
                                                        </span>
                                                    </div>
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap2">
                                                            <span class="ecm_navTreeIconContainerArrow2">
                                                            <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                            </span>
                                                            <div class="ecm_treeItemContainer">
                                                                <span class="ecm_navTree_textContent">
                                                                    Budova
                                                                </span>
                                                            </div>
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                        FVE
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">

                                                                <div class="ecm_treeItemContainer">
                                                                    <span class="ecm_navTree_textContent">
                                                                    Elektroměr
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                            Baterie
                                                                        </span>
                                                                    </div>
                                                                  </div>
                                                            </li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li class="ecm_NavTree-Item-3">
                                        <details class="ecm_navTree-Details-2">
                                            <summary class="ecm_navTreeSummaryContainer">
                                                <div class="ecm_itemTreeWrap2">
                                                    <span class="ecm_navTreeIconContainerArrow2">
                                                        <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                    </span>
                                                    <div class="ecm_treeItemContainer">
                                                        <span class="ecm_navTree_textContent">
                                                            Nějaká budova
                                                        </span>
                                                    </div>
                                                </div>
                                            </summary>
                                            <ul class="ecm_navTree-fourthListLast">
                                                <li class="ecm_NavTree-fourthItem">
                                                    <details class="ecm_navTree-fourthDetailsLast">
                                                      <summary class="ecm_navTreeSummaryContainer">
                                                        <div class="ecm_itemTreeWrap2">
                                                            <span class="ecm_navTreeIconContainerArrow2">
                                                            <span class="material-icons testIcon" style="font-size: 13px;">arrow_forward_ios</span>
                                                            </span>
                                                            <div class="ecm_treeItemContainer">
                                                                <span class="ecm_navTree_textContent">
                                                                    Budova
                                                                </span>
                                                            </div>
                                                        </div>
                                                      </summary>
                                                        <ul class="ecm_navTree-List-5">
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                        FVE
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">

                                                                <div class="ecm_treeItemContainer">
                                                                    <span class="ecm_navTree_textContent">
                                                                    Elektroměr
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            </li>
                                                            <li class="ecm_NavTree-Item-5">
                                                                <div class="ecm_itemTreeWrap2">
                                                                    <div class="ecm_treeItemContainer">
                                                                        <span class="ecm_navTree_textContent">
                                                                            Baterie
                                                                        </span>
                                                                    </div>
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
            <span class="ecm_aFupSection">© 2024 - ECM System Solutions s.r.o.</span>
            <span class="ecm_aFbottomSection">ECM marfy Verze 0</span>
        </div>
        <div class="ecm_resize"></div>

    </aside>
</template>

<style setup lang="scss">

 .ecm_asideContainer {
    width: 300px;
    min-height: 100vh;
    background-color: var(--sideMenu-itemList-background);
    position: absolute;
    top: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 4;
 }

 .headerAside {
    width: 100%;
    height: 123px;
    background-color: var(--sideMenu-headerBacground);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;   
 }




 .logoContainerAside {
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
 }

 .selectContainerAside {
    @extend .logoContainerAside;
    max-width: 300px;
 }

 //**************************** */

 .ecm_navTreeMainList   {
   
  display: flex;
  --spacing: 25px;
  --radius: 80px;
  width: 100%;
  height: calc(100vh - 200px);
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  
}


.ecmNavTreeContainer {
    display: flex;
    overflow-y: auto;
    height: calc(100vh - 200px);
}

.testIcon {
  width: 10px;
  color: var( --sideMenu-iconColorSec);
}

.testIcon2 {
  width: 26px;
  color: var(--sideMenu-iconColorPrim);  
}

.ecm_navTreeSummaryContainer {
  display: flex;
  align-items: center;
  padding: 0 13px;
  position: relative;
}


.ecm_itemTreeWrap {
    position: absolute;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-radius: 5px;
    transition: var(--transtion1);
    background-color: var(--sideMenu-itemBac);
    color: var(--sideMenu-color);
    align-items: center;

    &:hover {
        background-color: var(--sideMenu-hovBac);
        color: var(--sideMenu-hovColor);
    }

    &:hover .ecm_navTreeIconContainerArrow > .testIcon  {
       color: var(--sideMenu-ArrowColorHov);
    }

    &:hover .ecm_navTreeIconContainer > .testIcon2 {
        color: white;
    }
   
}

.ecm_navTreeIconContainerArrow {
    display: flex
}

.ecm_navTreeIconContainerArrow2 {
    display: flex;
    margin: 0 8px;
    
}

.ecm_navTree_textContent {
    text-align: center;
    display: flex;
    height: 35px;
    white-space: nowrap;
    align-items: center;
    justify-content: flex-end;
  
}

.ecm_navTreeIconContainer {
    height: 100%;
    padding: 0 10px;
    display: flex;
}

.ecm_treeItemContainer {
    display: flex;
    width: 245px;
    overflow: hidden;
    align-items: center;
}


.ecm_navTreeMainList li {
  display: flex;
  position: relative;
  padding-left: calc(2 * var(--spacing) - var(--radius) - 15px);
  padding-top: 10px;
  list-style: none;
}

.ecm_navTreeMainList ul {
  margin-left: calc(var(--radius) - var(--spacing));
  padding-left: 0;
}

.ecm_navTree-List-2 ul {
    margin-left: calc(var(--radius) - var(--spacing));
    margin-left: 25px;
}

.ecm_navTree-List-3 ul {
    margin-left: 23px;
}

.ecm_navTreeMainList ul li {
  border-left: 2px solid var(--sideMenu-line-item);
  color: var(--sideMenu-color);
}

.ecm_navTreeMainList ul li:last-child {
  border-color: transparent;
}

.ecm_navTreeMainList ul li::before {
    content: "";
    display: flex;
    position: absolute;
    top: calc(var(--spacing) / -1);
    left: -2px;
    width: calc(var(--spacing) + -7px);
    height: calc(var(--spacing) - -2px);
    border: solid var(--sideMenu-line-item);
    border-width: 0 0 2px 2px;
    margin-top: 25px;
}

.ecm_navTreeMainList summary {
  display: flex;
  cursor: pointer;
  width: 100%;
  height: 35px;
}

// .ecm_navTree-Details-2 summary {
//     width: calc(100% - 25px);
// }

 



.ecm_navTreeMainList summary::marker,
.ecm_navTreeMainList summary::-webkit-details-marker {
  display: none;
}


.ecm_navTreeMainList details[open] > summary::before {
  background-position: calc(-2 * var(--radius)) 0;
}



.ecm_itemTreeWrap2 {
   width: calc(100% - 55px);
   display: flex;
   border-radius: 5px;
   background-color: var(--sideMenu-itemBac);
   color: var(--sideMenu-color);
   transition: var(--transtion1);
   align-items: center;
  &:hover {
        background-color: var(--sideMenu-hovBac);
        color: var(--sideMenu-hovColor);
        
  }
  &:hover .ecm_navTreeIconContainerArrow2 > .testIcon  {
        color: var(--sideMenu-ArrowColorHov);
  }
}

.ecm_itemTreeWrap3 {
    width: 100%;
    display: flex;
    border-radius: 5px;
    text-align: right;
    padding-right: 10px;
    background-color: var(--sideMenu-itemBac);
    color: var(--sideMenu-color);
    transition: var(--transtion1);
    align-items: center;
    border: 1px solid red;
    &:hover {
        background-color: var(--sideMenu-hovBac);
        color: var(--sideMenu-hovColor);
        
    }
    &:hover .ecm_navTreeIconContainer2 > .testIcon  {
        color: var(--sideMenu-ArrowColorHov);
    }
}

.ecm_itemTreeWrap-5 {
    display: flex;
    padding: 0 10px;
    border-radius: 5px;
    margin-left: -20px;
    background-color: var(--sideMenu-itemBac);
    color: var(--sideMenu-color);
    transition: var(--transtion1);
    align-items: center;
    &:hover {
        background-color: var(--sideMenu-hovBac);
        color: var(--sideMenu-hovColor);
    }
    &:hover .ecm_navTreeIconContainerArrow > .testIcon  {
        color: var(--sideMenu-ArrowColorHov);
    }
} 

.ecm_navTree-List-5 {
    --spacing: 25px;
    --radius: 10px;
}

.ecm_navTree-List-5 li {
  padding-left: calc(2 * var(--spacing) - var(--radius) - 1px);
  cursor: pointer;
}

.ecm_navTree-List-5 li::before {
    width: calc(var(--spacing) + -8px) !important;
}

.ecm_navTreeIconContainer2 {
    display: flex;
    margin: 0 10px;
}

.ecm_resize {
    width: 5px;
    height: 100%;
    position: absolute;
    right:0px;
    z-index: 200;
    cursor: col-resize;

    &:hover {
        background-color: var(--sideMenu-resize);
    }
}



.ecmNavTreeContainer > ::-webkit-scrollbar {
  position: absolute;  
  width: 8px;
}

.ecm_asaidFotter {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 25px 25px;
}



.ecm_aFupSection {
    color: var(--sideMenu-colorFotterPrim);
    font-size: 13px;
    padding-bottom: 5px;
}

.ecm_aFbottomSection {
    color: var(--sideMenu-colorFotterSec);
    font-size: 13px;
}

.ecm_navTree-List-5 .ecm_NavTree-Item-5 {
    padding: 10px 0px;
}

.ecm_navTree-List-5 .ecm_itemTreeWrap2 {
    margin-left: 15px;
}


.ecm_navTree-List-5 .ecm_navTree_textContent {
    padding-left: 25px;
}

.ecm_NavTreeMainItem .ecm_NavTree-Item-5 {
    padding: 10px 0px;
}

// .ecm_NavTreeMainItem .ecm_itemTreeWrap2 {
//     margin-left: 15px;
// }


.last {
    padding-left: 25px;
  //  margin-left: 15px;
}

.evmRingBc {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    border-radius: 25vh;
    background-color:#e7eaee;
}


@media(max-width: 712px) {
    .ecm_asideContainer {
        display: none;
    }
}

</style>