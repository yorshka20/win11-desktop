import { Subject, Subscription, filter } from 'rxjs';

import type { Position } from '../types';
import { PipeEvent } from './context';
import { RxStore } from './rx-store';

type WindowState = {
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  data: Options;
};

export interface BaseWindowOptions {
  reuse: boolean;
  id: string;
  title: string;
  position: Position;
  zIndex: number;
  size: [number, number];
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

export class WindowManager {
  private windowHandlerMap: Record<string, WindowHandler>;

  /** Record<windowId, rxStore> */
  private windowState$Map: Record<string, RxStore<WindowState>>;

  private windowEventMap: Record<string, Subscription>;

  constructor(private event$: Subject<PipeEvent>) {
    this.windowHandlerMap = {};
    this.windowState$Map = {};
    this.windowEventMap = {};
  }

  addWindow(id: string, window: WindowHandler) {
    this.windowHandlerMap[id] = window;
    this.windowState$Map[id] = new RxStore<WindowState>({
      isActive: false,
      isMaximized: false,
      isMinimized: false,
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
    this.getWindowState$(id).updateState(key, value);
  }

  subscribeWindowState<T extends keyof WindowState>(
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
    const window = this.getWindow(id);
    window.close();
  }
}
