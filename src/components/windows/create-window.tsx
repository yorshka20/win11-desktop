import React from 'react';

import type { Options } from '../../context/window-manager';
import type { WindowType } from '../../types';
import { createExplorerWindow } from './explorer';

export function windowOpener(
  windowType: WindowType,
  options: Options,
): React.JSX.Element {
  let window: React.JSX.Element;

  switch (windowType) {
    case 'Explorer':
      window = createExplorerWindow(windowType, options);
      break;
    case 'Setting': {
      window = createExplorerWindow(windowType, options);
      break;
    }
    case 'Image': {
      window = createExplorerWindow(windowType, options);
      break;
    }
    default:
      window = createExplorerWindow(windowType, options);
      break;
  }

  return window;
}
