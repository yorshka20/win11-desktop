import { WindowContextType } from '../../../context/context';
import type { Options, WindowHandler } from '../../../context/window-manager';
import { ImageWindowComponent } from './window';

export function createImageWindow(
  context: WindowContextType,
  defaultOptions = {} as Options,
) {
  const { windowManager, event$ } = context;

  const id = `ImageWindow-${Math.random().toString(36)}`;

  const options: Options = {
    ...defaultOptions,
    id,
    size: [800, 600],
    position: [200, 100],
    previewPosition: [200, 100],
    title: id,
    reuse: false,
    zIndex: 10,
    content: id,
    type: 'Image',
  };

  const window = <ImageWindowComponent id={id} />;

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

  // 1. add window
  windowManager.addWindow(id, handler);

  // 2. open window
  event$.next({
    name: 'open-window',
    id,
  });

  return window;
}