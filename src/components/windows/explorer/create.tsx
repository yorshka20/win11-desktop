import { type Options } from '../../../context/window-manager';
import type { WindowType } from '../../../types';
import { ExplorerWindowComponent } from './window';

export function createExplorerWindow(windowType: WindowType, options: Options) {
  console.log('options in create window', windowType, options);

  return <ExplorerWindowComponent {...options} />;
}
