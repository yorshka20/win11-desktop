import { unmountComponentAtNode } from 'react-dom';

import { store } from '../../context/store';
import type { Options, WindowHandler, WindowType } from './interface';
import './style.less';
import { createWindow } from './window-component';

let desktopContainer: HTMLDivElement;

function getDesktopContainer() {
  if (desktopContainer) {
    return desktopContainer;
  }

  const container = document.getElementById(
    'desktop-window-container',
  ) as HTMLDivElement;
  desktopContainer = container;
  return container;
}

export function windowOpener(
  windowType: WindowType,
  options: Options,
): WindowHandler {
  const desktopContainer = getDesktopContainer();

  store.dispatchEvent({
    name: 'create-window',
    value: {
      windowType,
      options,
    },
  });

  const window = createWindow(windowType, options);
  const handler = {
    close() {
      unmountComponentAtNode(desktopContainer);
    },
    move(pos) {
      console.log('move window', pos);
    },
    maximize() {
      //
    },
    minimize() {
      //
    },
    window,
  } as WindowHandler;

  console.log('windowOpener', window, handler);

  return handler;
}
