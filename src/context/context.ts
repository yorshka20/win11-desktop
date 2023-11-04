import React from 'react';
import { Subject } from 'rxjs';

import { store } from './store';
import { type Options, WindowManager } from './window-manager';

export interface WindowContextType {
  dispatcher: typeof dispatcher;
  windowManager: WindowManager;
  event$: Subject<PipeEvent>;
  desktopContainer: HTMLDivElement;
}

function dispatcher(command: 'display-start-menu', value?: boolean): void;
function dispatcher(command: 'display-context-menu', value?: boolean): void;
function dispatcher(command: 'click-desktop-icon', value: string): void;
function dispatcher(command: 'click-taskbar-icon', value: string): void;
function dispatcher(
  command: string,
  value?: boolean | string | Partial<Options>,
) {
  console.log('[command]: ', command, value);
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
    case 'click-desktop-icon': {
      console.log('click desktop-icon', value);
      break;
    }
    case 'click-taskbar-icon': {
      console.log('click taskbar-icon', value);
      break;
    }

    default:
      break;
  }
}

type PipeEventType =
  | 'open-window'
  | 'close-window'
  | 'maximize-window'
  | 'minimize-window';

export type PipeEvent = {
  id: string;
  name: PipeEventType;
  data?: Record<string, unknown>;
};

const eventPipe = new Subject<PipeEvent>();

const defaultContext: WindowContextType = {
  dispatcher,
  event$: eventPipe,
  windowManager: new WindowManager(eventPipe),
  desktopContainer: {} as HTMLDivElement,
};

export function makeContextValue() {
  return defaultContext;
}

export const WindowContext =
  React.createContext<WindowContextType>(defaultContext);
