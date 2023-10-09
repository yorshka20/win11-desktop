import React from 'react';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

import { Options, WindowHandler } from '../components/windows/interface';
import { PipeEvent, store } from './store';

export interface WindowContextType {
  dispatcher: typeof dispatcher;
  windowManager: WindowManager;
  event$: Subject<PipeEvent>;
  desktopContainer: HTMLDivElement;
}

function dispatcher(command: 'display-start-menu', value?: boolean): void;
function dispatcher(command: 'display-context-menu', value?: boolean): void;
function dispatcher(
  command: string,
  value?: boolean | string | Partial<Options>,
) {
  console.log('command', command, value);
  switch (command) {
    case 'display-start-menu': {
      const state = (value ?? !store.getStateValue('showStartMenu')) as boolean;
      store.updateState('showStartMenu', state);
      break;
    }
    case 'display-context-menu': {
      const state = (value ??
        !store.getStateValue('showContextMenu')) as boolean;
      store.updateState('showContextMenu', state);
      break;
    }

    default:
      break;
  }
}

type WindowState = {
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  data: Options;
};

type TypeOfSubject<T> = {
  subject: BehaviorSubject<T>;
  subscription: Subscription;
};

// ${id}-${key}
type LabelType<T extends string, U extends string> = `${T}-${U}`;

// chatGPT told me to write like this.
type TypeAWithKeys<T extends keyof WindowState> = {
  [key in LabelType<string, T>]: TypeOfSubject<WindowState[T]>;
};

class WindowManager {
  private windowHandleMap: Record<string, WindowHandler>;

  private windowStateMap: Record<string, WindowState>;

  private stateSubscription: TypeAWithKeys<keyof WindowState>;

  constructor() {
    this.windowHandleMap = {};
    this.windowStateMap = {};
    this.stateSubscription = {};
  }

  addWindow(id: string, window: WindowHandler) {
    this.windowHandleMap[id] = window;
    this.windowStateMap[id] = {
      isActive: false,
      isMaximized: false,
      isMinimized: false,
      data: window.data,
    };
  }

  getWindow(id: string) {
    return this.windowHandleMap[id];
  }

  getWindowState<T extends keyof WindowState>(
    id: string,
    key: T,
  ): WindowState[T] {
    return this.windowStateMap[id][key];
  }

  private getLabel<T extends keyof WindowState>(
    id: string,
    key: T,
  ): LabelType<string, T> {
    return `${id}-${key}`;
  }

  updateWindowState<T extends keyof WindowState>(
    id: string,
    key: T,
    value: WindowState[T],
  ) {
    this.windowStateMap[id][key] = value;
    const label = this.getLabel(id, key);
    if (this.stateSubscription[label]?.subject) {
      this.stateSubscription[label]!.subject.next(value);
    }
  }

  subscribeWindowState<T extends keyof WindowState>(
    id: string,
    key: T,
    fn: (v: WindowState[T]) => void,
  ): Subscription {
    const label = this.getLabel(id, key);
    const sub = this.stateSubscription[label];
    if (sub) {
      sub.subscription.unsubscribe();
    }

    type StateValueLike = WindowState[keyof WindowState];

    const state = this.getWindowState(id, key);
    const subject = new BehaviorSubject<StateValueLike>(state);
    // no way to figure out the correct type definition.
    const subscription = subject.subscribe((v) => fn(v as WindowState[T]));
    this.stateSubscription[label] = {
      subject,
      subscription,
    };
    return subscription;
  }

  maximizeWindow(id: string) {
    const window = this.getWindow(id);
    window.maximize();
    this.updateWindowState(id, 'isMaximized', true);
  }
  minimizeWindow(id: string) {
    const window = this.getWindow(id);
    window.minimize();
    this.updateWindowState(id, 'isMinimized', true);
  }
  closeWindow(id: string) {
    const window = this.getWindow(id);
    window.close();
  }
}

const defaultContext: WindowContextType = {
  dispatcher,
  event$: new Subject<PipeEvent>(),
  windowManager: new WindowManager(),
  desktopContainer: {} as HTMLDivElement,
};

export function makeContextValue() {
  return defaultContext;
}

export const WindowContext =
  React.createContext<WindowContextType>(defaultContext);
