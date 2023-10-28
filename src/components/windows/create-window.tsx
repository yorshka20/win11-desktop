import React from 'react';

import { WindowContextType } from '../../context/context';
import { type Options } from '../../context/window-manager';
import type { WindowType } from '../../types';
import { createExplorerWindow } from './explorer/create';
import { createSettingWindow } from './setting/create';

/**
 * create window component by windowType.
 *
 * options are the default options for the window.
 *
 * windowState will be managed in windowComponent by itself.
 *
 * @export
 * @param {WindowType} windowType
 * @param {WindowContextType} context
 * @param {Options} options
 * @return {*}  {React.JSX.Element}
 */
export function windowOpener(
  windowType: WindowType,
  context: WindowContextType,
  options = {} as Options,
): React.JSX.Element {
  let window: React.JSX.Element;

  switch (windowType) {
    case 'Explorer':
      window = createExplorerWindow(context, options);
      break;
    case 'Setting': {
      window = createSettingWindow(context, options);
      break;
    }
    case 'Image': {
      window = createExplorerWindow(context, options);
      break;
    }
    default:
      window = createExplorerWindow(context, options);
      break;
  }

  return window;
}
