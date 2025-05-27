import { h, nextTick, ref } from 'vue';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';

export function useTreeNavigation(handleNodeClick: (node: any) => void) {
  const store = useSelectedItemStore();

  function renderTree(nodes: any[], isRoot = false): any {
    if (!nodes?.length) return null;

    return nodes.map((node) => {
      const arrowRef = ref<HTMLElement | null>(null);
      const detailsRef = ref<HTMLElement | null>(null);
      const arrowHover = ref(false);

      const isExpanded = store.isNodeExpanded(node.id);

      function setArrowRotation() {
        if (arrowRef.value && detailsRef.value) {
          const isOpen = (detailsRef.value as HTMLDetailsElement).open;
          arrowRef.value.classList.toggle('ecm-aside__arrow--open', isOpen);
          store.toggleNodeExpanded(node.id, isOpen);
        }
      }

      nextTick(() => {
        if (detailsRef.value) {
          detailsRef.value.removeEventListener('toggle', setArrowRotation);
          detailsRef.value.addEventListener('toggle', setArrowRotation);
          (detailsRef.value as HTMLDetailsElement).open = isExpanded;
          setArrowRotation();
        }
      });

      function handleArrowClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (detailsRef.value) {
          (detailsRef.value as HTMLDetailsElement).open = !(detailsRef.value as HTMLDetailsElement).open;
        }
      }

      return h('li', { class: 'ecm-aside__nav-tree-main-item', key: node.id }, [
        h('details', { class: 'ecm-aside__nav-tree-main-details', ref: detailsRef, open: isExpanded }, [
          h('summary', { class: 'ecm-aside__nav-tree-summary-container', onClick: e => e.preventDefault() }, [
            h('div', { class: 'ecm-aside__item-tree-wrap-2' }, [
              node.children?.length
                ? h('span', {
                    class: 'ecm-aside__nav-tree-icon-container-arrow-2',
                    onClick: handleArrowClick,
                    onMouseenter: () => arrowHover.value = true,
                    onMouseleave: () => arrowHover.value = false
                  }, [
                    h('span', {
                      class: 'material-icons ecm-aside__test-icon ecm-aside__arrow',
                      ref: arrowRef,
                      style: 'font-size: 13px;'
                    }, 'arrow_forward_ios')
                  ])
                : null,
              h('div', {
                class: [
                  'ecm-aside__tree-item-container',
                  !node.children?.length ? 'ecm-aside__tree-item-container--no-arrow' : ''
                ].join(' ')
              }, [
                isRoot
                  ? h('span', { class: 'ecm-aside__nav-tree-icon-container' }, [
                      h('span', { class: 'material-icons ecm-aside__secondary-icon', style: 'font-size: 26px;' }, 'adjust')
                    ])
                  : null,
                h('span', { class: 'ecm-aside__nav-tree-text-content', onClick: () => handleNodeClick(node) }, node.name)
              ])
            ])
          ]),
          node.children?.length
            ? h('ul', { class: 'ecm-aside__nav-tree-main-list' }, renderTree(node.children))
            : null
        ])
      ]);
    });
  }

  return {
    renderTree
  };
}
