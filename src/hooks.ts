import React, { useContext, useEffect, useRef, useState } from 'react';
import { filter } from 'rxjs';

import { type PipeEvent, WindowContext } from './context/context';
import { type ContextStoreState, store } from './context/store';

export function useWindowContext() {
  return useContext(WindowContext);
}

export function useContextState<T extends keyof ContextStoreState>(
  key: T,
): ContextStoreState[T] {
  const defaultValue = store.getStateValue(key);
  const [state, setState] = useState<ContextStoreState[T]>(defaultValue);

  useEffect(() => {
    const subscription = store.subscribeState(key, setState);
    return () => {
      subscription.unsubscribe();
    };
  }, [key]);

  return state;
}

type SelectionArea = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export function useDesktopSelection(ref: React.RefObject<HTMLDivElement>) {
  const [selectionArea, setSelectionArea] = useState<
    SelectionArea | undefined
  >();

  const selectionRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const container = ref.current;
    if (!container) {
      return;
    }

    function getSelection() {
      if (selectionRef.current) {
        return selectionRef.current;
      }
      const target = document.getElementById(
        'desktop-selection',
      ) as HTMLDivElement;

      selectionRef.current = target;

      return target;
    }

    function hideSelection() {
      const selection = getSelection();
      selection.style.visibility = 'hidden';
    }

    let x = 0;
    let y = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const selection = getSelection();
      const area = {} as SelectionArea;

      let xx = 0;
      let yy = 0;

      if (e.clientX < x) {
        selection.style.left = `${e.clientX}px`;
        if (e.clientY > y) {
          selection.style.top = `${y}px`;
          yy = y;
        } else {
          selection.style.top = `${e.clientY}px`;
          yy = e.clientY;
        }
        xx = e.clientX;
      } else {
        selection.style.left = `${x}px`;
        if (e.clientY > y) {
          selection.style.top = `${y}px`;
          yy = y;
        } else {
          selection.style.top = `${e.clientY}px`;
          yy = e.clientY;
        }
        xx = x;
      }

      area.x = xx;
      area.y = yy;
      const w = Math.abs(e.clientX - x);
      const h = Math.abs(e.clientY - y);
      selection.style.width = `${w}px`;
      selection.style.height = `${h}px`;
      area.w = w;
      area.h = h;

      setSelectionArea(area);

      selection.style.visibility = 'visible';

      container.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
      setSelectionArea(undefined);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);

      hideSelection();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) {
        return;
      }
      const ele = e.target as HTMLDivElement;
      if (!ele || !ele['classList']?.contains('desktop-container')) {
        return;
      }

      x = e.clientX;
      y = e.clientY;

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
    };

    container.addEventListener('mousedown', handleMouseDown);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
    };
  }, [ref]);

  return selectionArea;
}

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

type EventListenerPair = {
  event: PipeEvent['name'];
  handler: (id: string, e: PipeEvent) => void;
}[];

/**
 * subscribe window events
 *
 * if `id` = '*', events from all windows will be handled.
 *
 * @export
 * @param {string} id
 * @param {EventListenerPair} pairs
 */
export function useEventListener(id: string | '*', pairs: EventListenerPair) {
  const { event$ } = useWindowContext();

  useEffect(() => {
    const events: PipeEvent['name'][] = [];
    const eventMap = {} as Record<
      PipeEvent['name'],
      EventListenerPair[number]['handler']
    >;
    pairs.forEach((pair) => {
      events.push(pair.event);
      eventMap[pair.event] = pair.handler;
    });

    const subscription = event$
      .pipe(
        // if id === '*', do not filter.
        filter((i) => (id === '*' ? true : i.id === id)),
        filter((i) => events.includes(i.name)),
      )
      .subscribe((e) => eventMap[e.name](e.id, e));

    return () => {
      subscription.unsubscribe();
    };
  }, [id, pairs, event$]);
}
