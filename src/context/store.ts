import { type Subscription } from 'rxjs';

import type { TaskbarConfigItem } from '../types';
import { RxStore, RxStoreContent } from './rx-store';

export interface ContextState extends RxStoreContent {
  theme: 'light' | 'dark';
  wallpaper: 'light' | 'dark';

  activeWindow: string;
  showStartMenu: boolean;
  showContextMenu: boolean;
  showSystemPreference: boolean;

  selectedDesktopIcons: string[];
  taskBarIcons: TaskbarConfigItem[];

  taskbarPreview: 'none' | 'Explorer' | string;
  hoverPreview: boolean;
}

type ContextKey = keyof ContextState;

type ContextValue<T extends ContextKey> = ContextState[T];

type StateSubscribeCallback<T extends keyof ContextState> = (
  v: ContextState[T],
) => void;

export class ContextStateStore {
  private state$: RxStore<ContextState>;

  private get value() {
    return this.state$.getValue();
  }

  constructor(defaultState: ContextState) {
    this.state$ = new RxStore<ContextState>(defaultState);
  }

  updateState<T extends ContextKey>(key: T, value: ContextValue<T>) {
    this.state$.updateState(key, value);
  }

  getStateValue<T extends ContextKey>(key: T): ContextValue<T> {
    return this.value[key];
  }

  subscribeState<T extends ContextKey>(
    key: T,
    callback: StateSubscribeCallback<T>,
  ): Subscription {
    return this.state$.subscribeKey(key, callback);
  }
}

export const store = new ContextStateStore({
  theme: 'light',
  wallpaper: 'light',

  activeWindow: 'main',
  showStartMenu: false,
  showContextMenu: false,
  showSystemPreference: false,

  selectedDesktopIcons: [],
  taskBarIcons: [],

  taskbarPreview: 'none',
  hoverPreview: false,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;
