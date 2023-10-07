import React from 'react';

import { WindowHandler } from '../components/windows/interface';
import { Options } from '../components/windows/interface';
import { store } from './store';

export interface WindowContextType {
  theme: 'light' | 'dark';
  dispatcher: typeof dispatcher;
  windowManager: WindowManager;
  desktopContainer: HTMLDivElement;
}

function dispatcher(command: 'trigger-start-menu'): void;
function dispatcher(command: 'display-start-menu', value: boolean): void;
function dispatcher(command: 'trigger-context-menu'): void;
function dispatcher(command: 'display-context-menu', value: boolean): void;
// function dispatcher(command: 'open-window', value: Partial<Options>): void;
function dispatcher(
  command: string,
  value?: boolean | string | Partial<Options>,
) {
  console.log('command', command, value, store.getValue());
  switch (command) {
    case 'trigger-theme': {
      // const state = store.getStateValue('theme');
      // store.updateState('theme', !state);
      break;
    }
    case 'trigger-start-menu': {
      const state = store.getStateValue('showStartMenu');
      store.updateState('showStartMenu', !state);
      break;
    }
    case 'display-start-menu': {
      store.updateState('showStartMenu', value as boolean);
      break;
    }
    case 'trigger-context-menu': {
      const state = store.getStateValue('showContextMenu');
      store.updateState('showContextMenu', !state);
      break;
    }

    default:
      break;
  }
}

class WindowManager {
  private windowHandleMap: Record<string, WindowHandler>;

  constructor() {
    this.windowHandleMap = {};
  }

  addWindow(id: string, window: WindowHandler) {
    this.windowHandleMap[id] = window;
  }

  getWindow(id: string) {
    return this.windowHandleMap[id];
  }

  maximizeWindow(id: string) {
    const window = this.getWindow(id);
    window.maximize();
  }
  minimizeWindow(id: string) {
    const window = this.getWindow(id);
    window.minimize();
  }
  closeWindow(id: string) {
    const window = this.getWindow(id);
    window.close();
  }
}

const defaultContext: WindowContextType = {
  theme: 'light',
  dispatcher,
  windowManager: new WindowManager(),
  desktopContainer: {} as HTMLDivElement,
};

export function makeContextValue() {
  return defaultContext;
}

export const WindowContext =
  React.createContext<WindowContextType>(defaultContext);
