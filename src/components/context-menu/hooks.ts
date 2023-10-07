import { useEffect, useRef, useState } from 'react';

import { store } from '../../context/store';

export function useContextMenu() {
  const ref = useRef<HTMLDivElement>();

  const [position, setPosition] = useState<[number, number]>([9999, 9999]);

  useEffect(() => {
    function hide() {
      store.updateState('showContextMenu', false);
      window.removeEventListener('click', handleClick);
    }

    function getContextMenu() {
      if (ref.current) {
        return ref.current;
      }
      const target = document.getElementById('context-menu') as HTMLDivElement;
      ref.current = target;
      return target;
    }

    function handleClick(e: MouseEvent) {
      console.log('e click', e, e.target);
      const ele = e.target as HTMLDivElement;
      const menu = getContextMenu();
      if (menu.contains(ele)) {
        return;
      }

      hide();
    }

    function handleContextMenu(e: MouseEvent) {
      e.preventDefault();

      setPosition([e.clientX, e.clientY]);

      store.updateState('showContextMenu', true);

      window.addEventListener('click', handleClick);
    }

    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return position;
}
