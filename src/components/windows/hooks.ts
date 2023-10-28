import { useEffect, useState } from 'react';

import {
  type WindowState,
  getDefaultWindowState,
} from '../../context/window-manager';
import { useWindowContext } from '../../hooks';

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
