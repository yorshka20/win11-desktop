import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { useEventListener, useWindowContext } from '../../hooks';
import { getIconByGroupAndName } from '../icons/internal-icons';
import { windowOpener } from './index';
import './style.less';

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
export const WindowComponentContainer = React.memo(() => {
  const context = useWindowContext();
  const { desktopContainer, windowManager, dispatcher } = context;

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
        windowManager.batchUpdateWindowState(id, {
          size: [width, height],
          position: [0, 0],
        });
      },
    },
    {
      event: 'minimize-window',
      handler(id) {
        // windowManager.updateWindowState(id, 'size', [0, 0]);
        windowManager.updateWindowState(id, 'position', [9999, 9999]);
      },
    },
  ]);

  // proxy operation for creating window components.
  // these events are emitted by desktop icon or taskbar icon.
  useEventListener('*', [
    {
      event: 'proxy-operation',
      async handler(id, e) {
        console.warn('[proxy operation]', id, e);
        const { name = '' } = e.data as { name: string };
        switch (name) {
          case 'extension-image': {
            windowOpener('Image', context);
            const icon = await getIconByGroupAndName('folder', 'picture');
            dispatcher('add-taskbar-icon', {
              name: 'image',
              icon,
            });
            break;
          }
          case 'Explorer': {
            windowOpener('Explorer', context);
            break;
          }
          default:
            break;
        }
      },
    },
  ]);

  // spread all window components to desktopContainer.
  return <>{windows.map((child) => createPortal(child, desktopContainer))}</>;
});
