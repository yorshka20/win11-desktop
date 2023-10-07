import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useEventListener, useWindowContext } from '../../hooks';

/**
 * createPortal at the Desktop root.
 *
 * new window component will be mounted at Desktop.
 *
 * @export
 * @return {*}
 */
export function WindowComponentContainer() {
  const { desktopContainer, windowManager } = useWindowContext();

  const [windows, setWindows] = useState<React.JSX.Element[]>([]);

  useEventListener([
    {
      event: 'close-window',
      handler(e) {
        const handler = windowManager.getWindow(e.value.id);
        setWindows((w) => w.filter((i) => i !== handler.window));
      },
    },
    {
      event: 'open-window',
      handler(e) {
        // windows are store in windowManager.
        const handler = windowManager.getWindow(e.value.id);
        setWindows((a) => [...a, handler.window]);
      },
    },
  ]);

  return <>{windows.map((child) => createPortal(child, desktopContainer))}</>;
}
