import React from 'react';

import { store } from './store';

export interface WindowContextType {
  theme: 'light' | 'dark';
  dispatcher: typeof dispatcher;
}

function dispatcher(command: 'trigger-start-menu'): void;
function dispatcher(command: 'display-start-menu', value: boolean): void;
function dispatcher(command: 'trigger-context-menu'): void;
function dispatcher(command: 'display-context-menu', value: boolean): void;
function dispatcher(command: string, value?: boolean | string) {
  console.log('command', command, value);
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
    case '': {
      break;
    }

    default:
      break;
  }
}

const defaultContext: WindowContextType = {
  theme: 'light',
  dispatcher,
};

export function makeContextValue() {
  return defaultContext;
}

export const WindowContext =
  React.createContext<WindowContextType>(defaultContext);
