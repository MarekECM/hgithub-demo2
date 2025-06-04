<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import { useMainSelect } from '@/stores/ui/useMainSelect';
import { useUiStore } from '@/stores/ui/uiStore';
import { getDashboards } from '@/services/ecm-marfy/dashboard/dashboardService';

import mainSelectW from '../components-aside/main-select-component.vue';
import { useOrgTree } from '@/composables/ecm-marfy/component-aside-ts/useOrgTree';
import { useTreeNavigation } from '@/composables/ecm-marfy/component-aside-ts/useTreeNavigation';
import { useResizeSidebar } from '@/composables/ecm-marfy/component-aside-ts/useResizeSidebar';

const emit = defineEmits(['dashboardData']);

const sidebarStore = useSidebarStore();
const store = useSelectedItemStore();
const mainSelect = useMainSelect();
const uiStore = useUiStore(); 

const { fetchOrgTree } = useOrgTree();
const { renderTree } = useTreeNavigation(handleNodeClick);
const { initResizeFn } = useResizeSidebar();

const searchTerm = ref('');

async function handleNodeClick(node: any) {
  store.selectedNodeId = node.id;
  const dashboards = await getDashboards(node.id ?? 0, store.selectedOrgId ?? 0, node.deviceTypeID == null);
  console.log(dashboards.data);
  if (dashboards.data != null) {
    emit('dashboardData', dashboards.data);
  }
}

watch(() => store.selectedOrgId, (orgId) => {
  fetchOrgTree(orgId, handleNodeClick);
}, { immediate: true });

onMounted(() => {
  const resize = document.querySelector('.ecm-aside__resize') as HTMLElement;
  const sidebar = document.querySelector('.ecm-aside') as HTMLElement;
  const treeItems = document.querySelectorAll('.ecm-aside__nav-tree-container') as NodeListOf<HTMLElement>;

  if (resize && sidebar && treeItems.length > 0) {
    sidebar.style.width = `${sidebarStore.width}px`;

    treeItems.forEach((treeItem) => {
      const treeItemWidth = sidebarStore.width - 5;
      treeItem.style.width = `${treeItemWidth}px`;
    });

    initResizeFn(resize, sidebar, treeItems);
  } else {
    console.error("Elementy .ecm-aside__resize, .ecm-aside nebo .ecm-aside__nav-tree-container nebyly nalezeny.");
  }
});
</script>


<template>
  <aside class="ecm-aside" :class="{ 'is-visible': uiStore.sidebar }">

    <div class="ecm-aside__header">
      <div class="ecm-aside__header-close-btn"  @click="uiStore.sidebar = false">
        <span class="material-icons">close</span>
      </div>
         

      <span class="ecm-aside__background-element"></span>
      <div class="ecm-aside__logo">
        <RouterLink :to="{ name: 'homeView' }">
          <img class="ecm-aside__logo-image" src="/src/components/img/logo_ecm_dark.png" alt="logo" />
        </RouterLink>
      </div>
      <div class="ecm-aside__select">
        <mainSelectW :filter="searchTerm" />
      </div>           
    </div>

    <div class="ecm-aside__search ecm-aside__search--hidden" :class="{ 'ecm-aside__search--active': mainSelect.isActive }">
      <span class="ecm-aside__search-icon material-icons">search</span>
      <input v-model="searchTerm" class="ecm-aside__search-input" type="search" placeholder="Hledej" autocomplete="off"/>
    </div>

    <div class="ecm-aside__nav-tree-container">
      <ul class="ecm-aside__nav-tree-main-list">
        <template v-if="store.isTreeLoadingTree">
          <li class="ecm-aside__nav-tree-loader">
            <span class="ecm-aside__nav-tree-loader-spinner"></span>
            <span class="ecm-aside__nav-tree-loader-text">Načítání...</span>
          </li>
        </template>
        <template v-else-if="store.orgTree.length">
          <component :is="{ render: () => renderTree(store.orgTree, true) }" />
        </template>
      </ul>
    </div>

    <div class="ecm-aside__footer">
      <span class="ecm-aside__footer-section ecm-aside__footer-section--top">© 2024 - ECM System Solutions s.r.o.</span>
      <span class="ecm-aside__footer-section ecm-aside__footer-section--bottom">ECM marfy Verze 0</span>
    </div>

    <slot></slot>
    <div class="ecm-aside__resize"></div>
  </aside>
</template>

