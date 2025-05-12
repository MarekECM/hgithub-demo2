<script setup lang="ts">
    import { ref, watch, onMounted, h, nextTick } from 'vue';
    import axios from 'axios';
    import mainSelectW from '../components-aside/main-select-component.vue';
    import { useSidebarStore } from '@/stores/resize';
    import { useSelectedItemStore } from '@/stores/useSelectedItemStore';
    import { useMainSelect } from '@/stores/useMainSelect';
    import { useUiStore } from '@/stores/uiStore';

    const emit = defineEmits(['dashboardData']);

    const sidebarStore = useSidebarStore();
    const store = useSelectedItemStore();
    const mainSelect = useMainSelect();
    const uiStore = useUiStore();

    async function fetchOrgTree(orgId: number | null) {
        if (orgId && store.idOfLoadedTree === orgId && store.orgTree.length > 0) {
            store.setIsTreeLoadingTree(false);
            return;
        }

        if (!orgId) {
            store.resetTreeState();
            return;
        }

        store.setIsTreeLoadingTree(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}Organization/Tree`, {
                params: { orgId }
            });
            store.setOrgTreeData(res.data);
            store.setIdOfLoadedTree(orgId);
        } catch (e) {
            store.setOrgTreeData([]);
            store.setIdOfLoadedTree(null);
        } finally {
            store.setIsTreeLoadingTree(false);
        }
    }

    watch(() => store.selectedOrgId, (orgId) => {
        fetchOrgTree(orgId);
    }, { immediate: true });

    function renderTree(nodes: any[], isRoot = false): any {
        if (!nodes || !nodes.length) return null;
        return nodes.map(node => {
            const arrowRef = ref<HTMLElement | null>(null);
            const detailsRef = ref<HTMLElement | null>(null);
            const arrowHover = ref(false);
            const isExpanded = store.isNodeExpanded(node.id);

            function setArrowRotation() {
                if (arrowRef.value && detailsRef.value) {
                    if ((detailsRef.value as HTMLDetailsElement).open) {
                        arrowRef.value.classList.add('ecm-aside__arrow--open');
                        store.toggleNodeExpanded(node.id, true);
                    } else {
                        arrowRef.value.classList.remove('ecm-aside__arrow--open');
                        store.toggleNodeExpanded(node.id, false);
                    }
                }
            }

            nextTick(() => {
                if (detailsRef.value) {
                    detailsRef.value.removeEventListener('toggle', setArrowRotation);
                    detailsRef.value.addEventListener('toggle', setArrowRotation);

                    if (store.isNodeExpanded(node.id)) {
                        (detailsRef.value as HTMLDetailsElement).open = true;
                    }

                    setArrowRotation();
                }
            });

            function handleArrowClick(e: MouseEvent) {
                e.stopPropagation();
                e.preventDefault();
                if (detailsRef.value) {
                    (detailsRef.value as HTMLDetailsElement).open = !(detailsRef.value as HTMLDetailsElement).open;
                }
            }

            function handleArrowMouseEnter() {
                arrowHover.value = true;
                if (arrowRef.value) arrowRef.value.classList.add('ecm-aside__arrow--hover');
            }
            function handleArrowMouseLeave() {
                arrowHover.value = false;
                if (arrowRef.value) arrowRef.value.classList.remove('ecm-aside__arrow--hover');
            }

            return h('li', { class: 'ecm-aside__nav-tree-main-item', key: node.id }, [
                h('details', {
                    class: 'ecm-aside__nav-tree-main-details',
                    ref: detailsRef,
                    open: isExpanded
                }, [
                    h('summary', { class: 'ecm-aside__nav-tree-summary-container', onClick: (e: MouseEvent) => e.preventDefault() }, [
                        h('div', { class: 'ecm-aside__item-tree-wrap-2' }, [
                            node.children && node.children.length > 0
                                ? h('span', {
                                    class: 'ecm-aside__nav-tree-icon-container-arrow-2',
                                    onClick: handleArrowClick,
                                    onMouseenter: handleArrowMouseEnter,
                                    onMouseleave: handleArrowMouseLeave
                                }, [
                                    h('span', {
                                        class: 'material-icons ecm-aside__test-icon ecm-aside__arrow',
                                        style: 'font-size: 13px;',
                                        ref: arrowRef
                                    }, 'arrow_forward_ios')
                                ])
                                : null,
                            h(
                                'div',
                                {
                                    class: [
                                        'ecm-aside__tree-item-container',
                                        !(node.children && node.children.length > 0)
                                            ? 'ecm-aside__tree-item-container--no-arrow'
                                            : ''
                                    ].join(' ')
                                },
                                [
                                    isRoot
                                        ? h('span', { class: 'ecm-aside__nav-tree-icon-container' }, [
                                            h('span', {
                                                class: 'material-icons ecm-aside__secondary-icon',
                                                style: 'font-size: 26px;'
                                            }, 'adjust')
                                        ])
                                        : null,
                                    h('span', { class: 'ecm-aside__nav-tree-text-content', onClick: () => handleNodeClick(node) }, node.name)
                                ]
                            )
                        ])
                    ]),
                    node.children && node.children.length > 0
                        ? h('ul', { class: 'ecm-aside__nav-tree-main-list' }, renderTree(node.children))
                        : null
                ])
            ]);
        });
    }

    async function handleNodeClick(node: any) {
        store.selectedNodeId = node.id;
        console.log(store.selectedNodeId);
        let dashboards = await axios.get(`${import.meta.env.VITE_API_URL}Dashboard/GetDashboards`, {
            params: {
                nodeId: node.id,
                orgId: store.selectedOrgId
            }
        });
        console.log(dashboards);
        emit('dashboardData', dashboards.data);
    }

    function initResizeFn(resize: HTMLElement, sidebar: HTMLElement, treeItems: NodeListOf<HTMLElement>): void {
        let x: number;
        let w: number;

        const minWidth = 300;
        const maxWidth = 1277;
        const sidebarToTreeItemDiff = 10;

        function startResize(clientX: number): void {
            x = clientX;
            const sbWidth = window.getComputedStyle(sidebar).width;

            w = parseInt(sbWidth, 10);

            document.addEventListener('mousemove', rs_mousemoveHandler);
            document.addEventListener('mouseup', rs_mouseupHandler);
            document.addEventListener('touchmove', rs_touchmoveHandler);
            document.addEventListener('touchend', rs_touchendHandler);
        }

        function rs_mousemoveHandler(e: MouseEvent): void {
            moveResize(e.clientX);
        }

        function rs_touchmoveHandler(e: TouchEvent): void {
            moveResize(e.touches[0].clientX);
        }

        function moveResize(clientX: number): void {
            const dx = clientX - x;
            const cw = w + dx;

            if (cw >= minWidth && cw <= maxWidth) {
                sidebar.style.width = `${cw}px`;
                sidebarStore.setWidth(cw);

                treeItems.forEach((treeItem) => {
                    const treeItemWidth = cw - sidebarToTreeItemDiff;
                    if (treeItemWidth > 0) {
                        treeItem.style.width = `${treeItemWidth}px`;
                    }
                });
            }
        }

        function rs_mouseupHandler(): void {
            stopResize();
        }

        function rs_touchendHandler(): void {
            stopResize();
        }

        function stopResize(): void {
            document.body.style.userSelect = '';

            document.removeEventListener('mousemove', rs_mousemoveHandler);
            document.removeEventListener('mouseup', rs_mouseupHandler);
            document.removeEventListener('touchmove', rs_touchmoveHandler);
            document.removeEventListener('touchend', rs_touchendHandler);
        }

        function rs_mousedownHandler(e: MouseEvent): void {
            document.body.style.userSelect = 'none';
            startResize(e.clientX);
        }

        function rs_touchstartHandler(e: TouchEvent): void {
            document.body.style.userSelect = 'none';
            startResize(e.touches[0].clientX);
        }

        resize.addEventListener('mousedown', rs_mousedownHandler);
        resize.addEventListener('touchstart', rs_touchstartHandler);
    }

    onMounted(() => {
        const resize = document.querySelector('.ecm-aside__resize') as HTMLElement;
        const sidebar = document.querySelector('.ecm-aside') as HTMLElement;
        const treeItems = document.querySelectorAll('.ecm-aside__nav-tree-container') as NodeListOf<HTMLElement>;

        if (resize && sidebar && treeItems.length > 0) {
            sidebar.style.width = `${sidebarStore.width}px`;

            treeItems.forEach((treeItem) => {
                const initialSidebarWidth = sidebarStore.width;
                const treeItemWidth = initialSidebarWidth - 5;
                treeItem.style.width = `${treeItemWidth}px`;
            });

            initResizeFn(resize, sidebar, treeItems);
        } else {
            console.error("Elementy .ecm_resize, .ecm_asideContainer nebo .ecm_treeItemContainer nebyly nalezeny.");
        }
    });
</script>

<template>
    <aside class="ecm-aside" :class="{ 'display-none': uiStore.isAsideVisible, 'display-block': !uiStore.isAsideVisible }">
        <div class="ecm-aside__header">
            <span class="ecm-aside__background-element"></span>
            <div class="ecm-aside__logo">
                <RouterLink :to="{ name: 'homeView' }">
                    <img class="ecm-aside__logo-image" src="/src/components/img/logo_ecm_dark.png" alt="logo">
                </RouterLink>
            </div>
            <div class="ecm-aside__select">
                <mainSelectW />
            </div>
        </div>

        <div class="ecm-aside__search ecm-aside__search--hidden" :class="{ 'ecm-aside__search--active': mainSelect.isActive }">
            <span class="ecm-aside__search-icon material-icons">search</span>
            <input class="ecm-aside__search-input" type="search" placeholder="Hledej">
        </div>

        <div class="ecm-aside__nav-tree-container" style="padding-top: 25px;">
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


<style scoped>
    .display-block {
        display: flex;
    }

    .display-none {
        display: none;
    }
</style>
