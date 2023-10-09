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
  ]);

  return <>{windows.map((child) => createPortal(child, desktopContainer))}</>;
}
