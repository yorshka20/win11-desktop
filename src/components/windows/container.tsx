import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useEventListener, useWindowContext } from '../../hooks';

/**
 * createPortal at the Desktop root.
 *
 * new window component will be mounted at Desktop.
 *
 * `close-window` and `open-window` will be handled here.
 *
 * @export
 * @return {*}
 */
export function WindowComponentContainer() {
  const { desktopContainer, windowManager } = useWindowContext();

  const [windows, setWindows] = useState<React.JSX.Element[]>([]);

  // handle window operations for all.
  useEventListener('*', [
    {
      event: 'close-window',
      handler(id) {
        const handler = windowManager.getWindow(id);
        // since we still need to use the handler
        setWindows((w) => w.filter((i) => i !== handler.window));
        // we should delete the window after we have unmounted it.
        windowManager.deleteWindow(id);
      },
    },
    {
      event: 'open-window',
      handler(id) {
        // windows are store in windowManager.
        const handler = windowManager.getWindow(id);
        setWindows((a) => [...a, handler.window]);
      },
    },
    {
      event: 'maximize-window',
      handler(id) {
        const { width, height } = desktopContainer.getBoundingClientRect();
        windowManager.updateWindowState(id, 'size', [width, height]);
        windowManager.updateWindowState(id, 'position', [0, 0]);
      },
    },
    {
      event: 'minimize-window',
      handler(id) {
        windowManager.updateWindowState(id, 'size', [0, 0]);
        windowManager.updateWindowState(id, 'position', [9999, 9999]);
      },
    },
  ]);

  // spread all window components to desktopContainer.
  return <>{windows.map((child) => createPortal(child, desktopContainer))}</>;
}
