import { useEffect, useState } from 'react';

import {
  type WindowState,
  getDefaultWindowState,
} from '../../context/window-manager';
import { useEventListener, useWindowContext } from '../../hooks';

/**
 * subscribe window maximize and minimize events
 *
 * @export
 * @param {string} id
 */
export function useWindowResize(id: string) {
  const { windowManager, desktopContainer } = useWindowContext();
  useEventListener(id, [
    {
      event: 'maximize-window',
      handler() {
        const { width, height } = desktopContainer.getBoundingClientRect();
        windowManager.updateWindowState(id, 'size', [width, height]);
      },
    },
    {
      event: 'minimize-window',
      handler() {
        windowManager.updateWindowState(id, 'size', [0, 0]);
      },
    },
  ]);
}

const dState = getDefaultWindowState();

/**
 * subscribe window state
 *
 * @export
 * @param {string} id
 */
export function useWindowState(id: string) {
  const { windowManager } = useWindowContext();
  const [windowState, setWindowState] = useState<WindowState>(dState);

  useEffect(() => {
    const sub = windowManager.subscribeState(id, setWindowState);
    return () => sub.unsubscribe();
  }, [windowManager, id]);

  return windowState;
}
