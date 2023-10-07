import React from 'react';

import { store } from './store';

export interface WindowContextType {
  theme: 'light' | 'dark';
  dispatcher: typeof dispatcher;
  desktopContainer: HTMLDivElement;
}

function dispatcher(command: 'trigger-start-menu'): void;
function dispatcher(command: 'display-start-menu', value: boolean): void;
function dispatcher(command: 'trigger-context-menu'): void;
function dispatcher(command: 'display-context-menu', value: boolean): void;
function dispatcher(command: 'create-window', value: any): void;
function dispatcher(command: string, value?: boolean | string) {
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
    case 'create-window': {
      store.dispatchEvent({
        name: 'create-window',
        value,
      });
      break;
    }

    default:
      break;
  }
}

const defaultContext: WindowContextType = {
  theme: 'light',
  dispatcher,
  desktopContainer: {} as HTMLDivElement,
};

export function makeContextValue() {
  return defaultContext;
}

export const WindowContext =
  React.createContext<WindowContextType>(defaultContext);
