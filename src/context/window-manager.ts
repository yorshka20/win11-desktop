import { Subject, Subscription, filter } from 'rxjs';

import type { Position, Size } from '../types';
import { createLogger } from '../utils/logger';
import { PipeEvent } from './context';
import { RxStore } from './rx-store';

export type WindowState = {
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  size: Size;
  position: Position;
  zIndex: number;
  data: Options;
};

export function getDefaultWindowState() {
  return {
    isActive: false,
    isMaximized: false,
    isMinimized: false,
    size: [0, 0] as Size,
    position: [0, 0] as Position,
    zIndex: 0,
    data: {} as Options,
  };
}

export interface BaseWindowOptions {
  reuse: boolean;
  id: string;
  title: string;
  position: Position;
  zIndex: number;
  size: Size;
  content: React.JSX.Element | string;
}

export type Options = BaseWindowOptions;

export type WindowHandler = {
  close: () => void;
  move: (pos: Position) => void;
  maximize: () => void;
  minimize: () => void;
  window: React.JSX.Element;
  data: Options;
};

const logger = createLogger('window-manager');

export class WindowManager {
  private windowHandlerMap: Record<string, WindowHandler>;

  /** Record<windowId, rxStore> */
  private windowState$Map: Record<string, RxStore<WindowState>>;

  private windowEventMap: Record<string, Subscription>;

  private maxZIndex = 0;
  private currentActiveWindowId = '';

  constructor(private event$: Subject<PipeEvent>) {
    this.windowHandlerMap = {};
    this.windowState$Map = {};
    this.windowEventMap = {};
  }

  addWindow(id: string, window: WindowHandler) {
    this.windowHandlerMap[id] = window;
    this.windowState$Map[id] = new RxStore<WindowState>({
      ...getDefaultWindowState(),
      size: window.data.size,
      position: window.data.position,
      data: window.data,
    });
    this.windowEventMap[id] = this.event$
      .pipe(filter((i) => i.id === id))
      .subscribe(this.handleWindowEvent);
  }

  // window operations will be conducted at components side.
  // we only update the window State here.
  private handleWindowEvent = ({ id, name }: PipeEvent) => {
    switch (name) {
      case 'close-window': {
        this.onCloseWindow(id);
        this.updateWindowState(id, 'isActive', false);
        break;
      }
      case 'open-window': {
        logger('window manager: open window', id);
        break;
      }
      case 'minimize-window': {
        this.onMinimizeWindow(id);
        this.updateWindowState(id, 'isActive', false);
        break;
      }
      case 'maximize-window': {
        this.onMaximizeWindow(id);
        this.updateWindowState(id, 'isActive', true);
        break;
      }
      default:
        break;
    }
  };

  deleteWindow(id: string) {
    // delete window handler and data
    delete this.windowHandlerMap[id];

    // destroy window state rxStore
    this.windowState$Map[id].destroy();
    delete this.windowState$Map[id];

    // unsubscribe from window events
    this.windowEventMap[id].unsubscribe();
    delete this.windowEventMap[id];
  }

  getWindow(id: string) {
    return this.windowHandlerMap[id];
  }

  getAllWindows() {
    return Object.values(this.windowHandlerMap);
  }

  getWindowStateByKey<T extends keyof WindowState>(
    id: string,
    key: T,
  ): WindowState[T] {
    return this.windowState$Map[id].getValue()[key];
  }

  private getWindowState$(id: string) {
    return this.windowState$Map[id];
  }

  updateWindowState<T extends keyof WindowState>(
    id: string,
    key: T,
    value: WindowState[T],
  ) {
    logger(`update window state: ${id} [${key}]: ${value}`);
    // window could have been destroyed
    this.getWindowState$(id)?.updateState(key, value);
  }

  subscribeState(id: string, fn: (v: WindowState) => void): Subscription {
    const subscription = this.getWindowState$(id).subscribeState(fn);
    return subscription;
  }

  subscribeStateByKey<T extends keyof WindowState>(
    id: string,
    key: T,
    fn: (v: WindowState[T]) => void,
  ): Subscription {
    const subscription = this.getWindowState$(id).subscribeKey(key, fn);
    return subscription;
  }

  private onMaximizeWindow(id: string, v?: boolean) {
    const value = v ?? !this.getWindowStateByKey(id, 'isMaximized');
    this.updateWindowState(id, 'isMaximized', value);
  }

  private onMinimizeWindow(id: string, v?: boolean) {
    const value = v ?? !this.getWindowStateByKey(id, 'isMinimized');
    this.updateWindowState(id, 'isMinimized', value);
  }

  private onCloseWindow(id: string) {
    id;
    //
  }

  focusWindow(id: string) {
    if (this.currentActiveWindowId === id) {
      return;
    }

    this.currentActiveWindowId = id;
    this.updateWindowState(id, 'isActive', true);
    this.updateWindowState(id, 'zIndex', this.maxZIndex++);
  }
}
