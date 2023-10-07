import React from 'react';

import type { Options, WindowType } from './interface';
import { createWindow } from './window-component';

// let desktopContainer: HTMLDivElement;

// function getDesktopContainer() {
//   if (desktopContainer) {
//     return desktopContainer;
//   }

//   const container = document.getElementById(
//     'desktop-window-container',
//   ) as HTMLDivElement;
//   desktopContainer = container;
//   return container;
// }

export function windowOpener(
  windowType: WindowType,
  options: Options,
): React.JSX.Element {
  const window = createWindow(windowType, options);

  return window;
}
