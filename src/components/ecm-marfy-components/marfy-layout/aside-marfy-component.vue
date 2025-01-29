<script setup lang="ts">
import {onMounted } from 'vue';
import mainSelectW from '../components-aside/main-select-component.vue'; // Import Vue komponenty
import { useSidebarStore } from '@/stores/resize';
import { useSelectedItemStore } from '@/stores/useSelectedItemStore';
import { useMainSelect } from '@/stores/useMainSelect';
import { useUiStore } from '@/stores/uiStore';

const sidebarStore = useSidebarStore();

function initResizeFn(resize: HTMLElement, sidebar: HTMLElement, treeItems: NodeListOf<HTMLElement>): void {
  let x: number;
  let w: number;

  // Minimální a maximální šířka sidebaru
  const minWidth = 300;
  const maxWidth = 1277;

  // Rozdíl mezi sidebar a tree item, který určuje relativní šířku
  const sidebarToTreeItemDiff = 10;

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
  const resize = document.querySelector('.ecm-aside__resize') as HTMLElement;
  const sidebar = document.querySelector('.ecm-aside') as HTMLElement;
  const treeItems = document.querySelectorAll('.ecm-aside__nav-tree-container') as NodeListOf<HTMLElement>;

  if (resize && sidebar && treeItems.length > 0) {
    // Nastavení šířky sidebaru na uloženou šířku
    sidebar.style.width = `${sidebarStore.width}px`;

    // Nastavení šířky pro všechny .ecm_treeItemContainer elementy podle šířky sidebaru
    treeItems.forEach((treeItem) => {
      const initialSidebarWidth = sidebarStore.width;
      const treeItemWidth = initialSidebarWidth - 5; // Rozdíl mezi sidebar a tree item
      treeItem.style.width = `${treeItemWidth}px`;
    });

    initResizeFn(resize, sidebar, treeItems);
  } else {
    console.error("Elementy .ecm_resize, .ecm_asideContainer nebo .ecm_treeItemContainer nebyly nalezeny.");
  }
});

const store = useSelectedItemStore();
const mainSelect =  useMainSelect();


// Připojení ke store
const uiStore = useUiStore();

// Přístup ke stavu
const isAsideVisible = uiStore.isAsideVisible;



// Připojení ke store

// Funkce pro přepnutí viditelnosti aside
const toggleAside = () => {
  uiStore.toggleAside(); // Zavolání metody z Pinia store
};
</script>


<template>
    <aside class="ecm-aside" :class="{ 'display-none': uiStore.isAsideVisible, 'display-block': !uiStore.isAsideVisible }">
        <div class="ecm-aside__header">
            <span class="ecm-aside__background-element"></span>
            <div class="ecm-aside__logo">
              <RouterLink :to="{ name: 'homeView' }">   <img class="ecm-aside__logo-image" src="/src/components/img/logo_ecm_dark.png" alt="logo"></RouterLink>
             
            </div>
            <div class="ecm-aside__select">
                <mainSelectW />
            </div>
        </div>

        <div class="ecm-aside__search ecm-aside__search--hidden" :class="{ 'ecm-aside__search--active': mainSelect.isActive }">
            <span class="ecm-aside__search-icon material-icons">search</span>
            <input class="ecm-aside__search-input" type="search" placeholder="Hledej">
        </div>

        <div class="ecm-aside__nav-tree-container">
          <ul class="ecm-aside__nav-tree-main-list">
            <li class="ecm-aside__nav-tree-main-item">
              <details class="ecm-aside__nav-tree-main-details" open>
                <summary class="ecm-aside__nav-tree-summary-container">
                  <div class="ecm-aside__item-tree-wrap">
                    <span class="ecm-aside__nav-tree-icon-container-arrow">
                      <span class="material-icons ecm-aside__primary-icon" style="font-size: 13px;">arrow_forward_ios</span>
                    </span>
                    <div class="ecm-aside__tree-item-container">
                      <span class="ecm-aside__nav-tree-icon-container">
                        <span class="material-icons ecm-aside__secondary-icon" style="font-size: 26px;">adjust</span>
                      </span>
                      <span class="ecm-aside__nav-tree-text-content">
                        {{ store.selectedItem }}
                      </span>
                    </div>
                  </div>
                </summary>
                <ul class="ecm-aside__nav-tree-list-2">
                  <li class="ecm-aside__nav-tree-item-2">
                    <details class="ecm-aside__nav-tree-details-2">
                      <summary class="ecm-aside__nav-tree-summary-container">
                        <div class="ecm-aside__item-tree-wrap-2">
                          <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                            <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                          </span>
                          <div class="ecm-aside__tree-item-container">
                            <span class="ecm-aside__nav-tree-text-content">
                              Opava Suché Lazce
                            </span>
                          </div>
                        </div>
                      </summary>
                      <ul class="ecm-aside__nav-tree-list-3">
                        <li class="ecm-aside__nav-tree-item-3">
                          <details class="ecm-aside__nav-tree-details-3">
                            <summary class="ecm-aside__nav-tree-summary-container">
                              <div class="ecm-aside__item-tree-wrap-2">
                                <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                  <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                </span>
                                <div class="ecm-aside__tree-item-container">
                                  <span class="ecm-aside__nav-tree-text-content">
                                    Nějaká budova
                                  </span>
                                </div>
                              </div>
                            </summary>
                            <ul class="ecm-aside__nav-tree-list-4">
                              <li class="ecm-aside__nav-tree-item-4">
                                <details class="ecm-aside__nav-tree-details-4">
                                  <summary class="ecm-aside__nav-tree-summary-container">
                                    <div class="ecm-aside__item-tree-wrap-2">
                                      <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                        <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                      </span>
                                      <div class="ecm-aside__tree-item-container">
                                        <span class="ecm-aside__nav-tree-text-content">
                                          Budova
                                        </span>
                                      </div>
                                    </div>
                                  </summary>
                                  <ul class="ecm-aside__nav-tree-list-5">
                                    <li class="ecm-aside__nav-tree-item-5">
                                      <div class="ecm-aside__item-tree-wrap-2">
                                        <div class="ecm-aside__tree-item-container">
                                          <span class="ecm-aside__nav-tree-text-content">
                                            FVE
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
                        <li class="ecm-aside__nav-tree-item-3">
                          <details class="ecm-aside__nav-tree-details-3">
                            <summary class="ecm-aside__nav-tree-summary-container">
                              <div class="ecm-aside__item-tree-wrap-2">
                                <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                  <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                </span>
                                <div class="ecm-aside__tree-item-container">
                                  <span class="ecm-aside__nav-tree-text-content">
                                    Nějaká budova
                                  </span>
                                </div>
                              </div>
                            </summary>
                            <ul class="ecm-aside__nav-tree-list-4">
                              <li class="ecm-aside__nav-tree-item-4">
                                <details class="ecm-aside__nav-tree-details-4">
                                  <summary class="ecm-aside__nav-tree-summary-container">
                                    <div class="ecm-aside__item-tree-wrap-2">
                                      <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                        <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                      </span>
                                      <div class="ecm-aside__tree-item-container">
                                        <span class="ecm-aside__nav-tree-text-content">
                                          Budova
                                        </span>
                                      </div>
                                    </div>
                                  </summary>
                                  <ul class="ecm-aside__nav-tree-list-5">
                                    <li class="ecm-aside__nav-tree-item-5">
                                      <div class="ecm-aside__item-tree-wrap-2">
                                        <div class="ecm-aside__tree-item-container">
                                          <span class="ecm-aside__nav-tree-text-content">
                                            FVE
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
                        <li class="ecm-aside__nav-tree-item-3">
                          <details class="ecm-aside__nav-tree-details-3">
                            <summary class="ecm-aside__nav-tree-summary-container">
                              <div class="ecm-aside__item-tree-wrap-2">
                                <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                  <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                </span>
                                <div class="ecm-aside__tree-item-container">
                                  <span class="ecm-aside__nav-tree-text-content">
                                    Nějaká budova
                                  </span>
                                </div>
                              </div>
                            </summary>
                            <ul class="ecm-aside__nav-tree-list-4">
                              <li class="ecm-aside__nav-tree-item-4">
                                <details class="ecm-aside__nav-tree-details-4">
                                  <summary class="ecm-aside__nav-tree-summary-container">
                                    <div class="ecm-aside__item-tree-wrap-2">
                                      <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                        <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                      </span>
                                      <div class="ecm-aside__tree-item-container">
                                        <span class="ecm-aside__nav-tree-text-content">
                                          Budova
                                        </span>
                                      </div>
                                    </div>
                                  </summary>
                                  <ul class="ecm-aside__nav-tree-list-5">
                                    <li class="ecm-aside__nav-tree-item-5">
                                      <div class="ecm-aside__item-tree-wrap-2">
                                        <div class="ecm-aside__tree-item-container">
                                          <span class="ecm-aside__nav-tree-text-content">
                                            FVE
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
                        <li class="ecm-aside__nav-tree-item-3">
                          <details class="ecm-aside__nav-tree-details-3">
                            <summary class="ecm-aside__nav-tree-summary-container">
                              <div class="ecm-aside__item-tree-wrap-2">
                                <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                  <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                </span>
                                <div class="ecm-aside__tree-item-container">
                                  <span class="ecm-aside__nav-tree-text-content">
                                    Nějaká budova
                                  </span>
                                </div>
                              </div>
                            </summary>
                            <ul class="ecm-aside__nav-tree-list-4">
                              <li class="ecm-aside__nav-tree-item-4">
                                <details class="ecm-aside__nav-tree-details-4">
                                  <summary class="ecm-aside__nav-tree-summary-container">
                                    <div class="ecm-aside__item-tree-wrap-2">
                                      <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                        <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                      </span>
                                      <div class="ecm-aside__tree-item-container">
                                        <span class="ecm-aside__nav-tree-text-content">
                                          Budova
                                        </span>
                                      </div>
                                    </div>
                                  </summary>
                                  <ul class="ecm-aside__nav-tree-list-5">
                                    <li class="ecm-aside__nav-tree-item-5">
                                      <div class="ecm-aside__item-tree-wrap-2">
                                        <div class="ecm-aside__tree-item-container">
                                          <span class="ecm-aside__nav-tree-text-content">
                                            FVE
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
                  <li class="ecm-aside__nav-tree-item-2">
                    <details class="ecm-aside__nav-tree-details-2">
                      <summary class="ecm-aside__nav-tree-summary-container">
                        <div class="ecm-aside__item-tree-wrap-2">
                          <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                            <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                          </span>
                          <div class="ecm-aside__tree-item-container">
                            <span class="ecm-aside__nav-tree-text-content">
                              Opava Suché Lazce
                            </span>
                          </div>
                        </div>
                      </summary>
                      <ul class="ecm-aside__nav-tree-list-3">
                        <li class="ecm-aside__nav-tree-item-3">
                          <details class="ecm-aside__nav-tree-details-3">
                            <summary class="ecm-aside__nav-tree-summary-container">
                              <div class="ecm-aside__item-tree-wrap-2">
                                <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                  <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                </span>
                                <div class="ecm-aside__tree-item-container">
                                  <span class="ecm-aside__nav-tree-text-content">
                                    Nějaká budova
                                  </span>
                                </div>
                              </div>
                            </summary>
                            <ul class="ecm-aside__nav-tree-list-4">
                              <li class="ecm-aside__nav-tree-item-4">
                                <details class="ecm-aside__nav-tree-details-4">
                                  <summary class="ecm-aside__nav-tree-summary-container">
                                    <div class="ecm-aside__item-tree-wrap-2">
                                      <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                        <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                      </span>
                                      <div class="ecm-aside__tree-item-container">
                                        <span class="ecm-aside__nav-tree-text-content">
                                          Budova
                                        </span>
                                      </div>
                                    </div>
                                  </summary>
                                  <ul class="ecm-aside__nav-tree-list-5">
                                    <li class="ecm-aside__nav-tree-item-5">
                                      <div class="ecm-aside__item-tree-wrap-2">
                                        <div class="ecm-aside__tree-item-container">
                                          <span class="ecm-aside__nav-tree-text-content">
                                            FVE
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
                        <li class="ecm-aside__nav-tree-item-3">
                          <details class="ecm-aside__nav-tree-details-3">
                            <summary class="ecm-aside__nav-tree-summary-container">
                              <div class="ecm-aside__item-tree-wrap-2">
                                <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                  <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                </span>
                                <div class="ecm-aside__tree-item-container">
                                  <span class="ecm-aside__nav-tree-text-content">
                                    Nějaká budova
                                  </span>
                                </div>
                              </div>
                            </summary>
                            <ul class="ecm-aside__nav-tree-list-4">
                              <li class="ecm-aside__nav-tree-item-4">
                                <details class="ecm-aside__nav-tree-details-4">
                                  <summary class="ecm-aside__nav-tree-summary-container">
                                    <div class="ecm-aside__item-tree-wrap-2">
                                      <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                        <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                      </span>
                                      <div class="ecm-aside__tree-item-container">
                                        <span class="ecm-aside__nav-tree-text-content">
                                          Budova
                                        </span>
                                      </div>
                                    </div>
                                  </summary>
                                  <ul class="ecm-aside__nav-tree-list-5">
                                    <li class="ecm-aside__nav-tree-item-5">
                                      <div class="ecm-aside__item-tree-wrap-2">
                                        <div class="ecm-aside__tree-item-container">
                                          <span class="ecm-aside__nav-tree-text-content">
                                            FVE
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
                        <li class="ecm-aside__nav-tree-item-3">
                          <details class="ecm-aside__nav-tree-details-3">
                            <summary class="ecm-aside__nav-tree-summary-container">
                              <div class="ecm-aside__item-tree-wrap-2">
                                <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                  <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                </span>
                                <div class="ecm-aside__tree-item-container">
                                  <span class="ecm-aside__nav-tree-text-content">
                                    Nějaká budova
                                  </span>
                                </div>
                              </div>
                            </summary>
                            <ul class="ecm-aside__nav-tree-list-4">
                              <li class="ecm-aside__nav-tree-item-4">
                                <details class="ecm-aside__nav-tree-details-4">
                                  <summary class="ecm-aside__nav-tree-summary-container">
                                    <div class="ecm-aside__item-tree-wrap-2">
                                      <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                        <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                      </span>
                                      <div class="ecm-aside__tree-item-container">
                                        <span class="ecm-aside__nav-tree-text-content">
                                          Budova
                                        </span>
                                      </div>
                                    </div>
                                  </summary>
                                  <ul class="ecm-aside__nav-tree-list-5">
                                    <li class="ecm-aside__nav-tree-item-5">
                                      <div class="ecm-aside__item-tree-wrap-2">
                                        <div class="ecm-aside__tree-item-container">
                                          <span class="ecm-aside__nav-tree-text-content">
                                            FVE
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
                        <li class="ecm-aside__nav-tree-item-3">
                          <details class="ecm-aside__nav-tree-details-3">
                            <summary class="ecm-aside__nav-tree-summary-container">
                              <div class="ecm-aside__item-tree-wrap-2">
                                <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                  <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                </span>
                                <div class="ecm-aside__tree-item-container">
                                  <span class="ecm-aside__nav-tree-text-content">
                                    Nějaká budova
                                  </span>
                                </div>
                              </div>
                            </summary>
                            <ul class="ecm-aside__nav-tree-list-4">
                              <li class="ecm-aside__nav-tree-item-4">
                                <details class="ecm-aside__nav-tree-details-4">
                                  <summary class="ecm-aside__nav-tree-summary-container">
                                    <div class="ecm-aside__item-tree-wrap-2">
                                      <span class="ecm-aside__nav-tree-icon-container-arrow-2">
                                        <span class="material-icons ecm-aside__test-icon" style="font-size: 13px;">arrow_forward_ios</span>
                                      </span>
                                      <div class="ecm-aside__tree-item-container">
                                        <span class="ecm-aside__nav-tree-text-content">
                                          Budova
                                        </span>
                                      </div>
                                    </div>
                                  </summary>
                                  <ul class="ecm-aside__nav-tree-list-5">
                                    <li class="ecm-aside__nav-tree-item-5">
                                      <div class="ecm-aside__item-tree-wrap-2">
                                        <div class="ecm-aside__tree-item-container">
                                          <span class="ecm-aside__nav-tree-text-content">
                                            FVE
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

        <div class="ecm-aside__footer">
            <span class="ecm-aside__footer-section ecm-aside__footer-section--top">© 2024 - ECM System Solutions s.r.o.</span>
            <span class="ecm-aside__footer-section ecm-aside__footer-section--bottom">ECM marfy Verze 0</span>
        </div>

       <div class="ecm-aside__resize"></div>
    </aside>
</template>


<style scoped>
.display-block {
  display: flex;
}

.display-none {
  display: none;
}
</style>
