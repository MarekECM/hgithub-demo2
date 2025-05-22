import { useSidebarStore } from '@/stores/resize';

export function useResizeSidebar() {
  const sidebarStore = useSidebarStore();

  function initResizeFn(resize: HTMLElement, sidebar: HTMLElement, treeItems: NodeListOf<HTMLElement>) {
    let x = 0;
    let w = 0;
    const minWidth = 300;
    const maxWidth = 1277;
    const diff = 10;

    function startResize(clientX: number) {
      x = clientX;
      w = parseInt(getComputedStyle(sidebar).width, 10);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopResize);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', stopResize);
    }

    function moveResize(clientX: number) {
      const dx = clientX - x;
      const newWidth = w + dx;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        sidebar.style.width = `${newWidth}px`;
        sidebarStore.setWidth(newWidth);
        treeItems.forEach(item => {
          item.style.width = `${newWidth - diff}px`;
        });
      }
    }

    function stopResize() {
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopResize);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', stopResize);
    }

    function onMouseMove(e: MouseEvent) {
      moveResize(e.clientX);
    }

    function onTouchMove(e: TouchEvent) {
      moveResize(e.touches[0].clientX);
    }

    resize.addEventListener('mousedown', e => {
      document.body.style.userSelect = 'none';
      startResize(e.clientX);
    });

    resize.addEventListener('touchstart', e => {
      document.body.style.userSelect = 'none';
      startResize(e.touches[0].clientX);
    });
  }

  return { initResizeFn };
}
