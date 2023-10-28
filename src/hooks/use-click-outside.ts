import { useEffect } from 'react';

export function useClickOutside(
  targets: (HTMLElement | string | null)[],
  callback: () => void,
) {
  useEffect(() => {
    if (!targets.length) {
      return;
    }

    const nodeList = targets.map((target) =>
      typeof target === 'string'
        ? target[0] === '#'
          ? document.getElementById(target.split('#')[1])
          : document.getElementsByClassName(target)
        : target,
    ) as HTMLElement[];

    function handler(e: MouseEvent) {
      for (const t of nodeList) {
        if (t?.contains(e.target as Node)) {
          return;
        }
      }
      callback();
    }

    window.addEventListener('mousedown', handler);

    return () => {
      window.removeEventListener('mousedown', handler);
    };
  }, [targets, callback]);
}
