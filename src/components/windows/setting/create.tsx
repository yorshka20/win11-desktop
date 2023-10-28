import { WindowContextType } from '../../../context/context';
import type { Options, WindowHandler } from '../../../context/window-manager';
import { SettingWindowComponent } from './window';

export function createSettingWindow(
  context: WindowContextType,
  defaultOptions = {} as Options,
) {
  console.log('options in create window', context, defaultOptions);

  const { windowManager, event$ } = context;

  const id = `settingWindow-${Math.random().toString(36)}`;

  const options: Options = {
    ...defaultOptions,
    id,
    size: [800, 600],
    position: [200, 100],
    title: id,
    reuse: false,
    zIndex: 10,
    content: id,
  };

  const window = <SettingWindowComponent {...options} />;

  const handler: WindowHandler = {
    close() {
      event$.next({
        name: 'close-window',
        id,
      });
    },
    move(pos) {
      console.log('move window', pos);
    },
    maximize() {
      event$.next({
        name: 'maximize-window',
        id,
      });
    },
    minimize() {
      event$.next({
        name: 'minimize-window',
        id,
      });
    },
    window,
    data: options,
  };

  console.log('windowOpener', window, handler);

  // 1. add window
  windowManager.addWindow(id, handler);

  // 2. open window
  event$.next({
    name: 'open-window',
    id,
  });

  return window;
}
