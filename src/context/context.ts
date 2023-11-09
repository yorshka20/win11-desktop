import { createContext } from 'react';
import { Subject } from 'rxjs';

import { store } from './store';
import { type Options, WindowManager } from './window-manager';

export interface WindowContextType {
  dispatcher: typeof dispatcher;
  windowManager: WindowManager;
  event$: Subject<PipeEvent>;
  desktopContainer: HTMLDivElement;
}

type ClickIconEvent = {
  name: string;
  type: 'window' | 'modal';
};

function dispatcher(command: 'display-start-menu', value?: boolean): void;
function dispatcher(command: 'display-context-menu', value?: boolean): void;
function dispatcher(command: 'click-desktop-icon', value: ClickIconEvent): void;
function dispatcher(command: 'click-taskbar-icon', value: ClickIconEvent): void;
function dispatcher(command: 'hover-taskbar-icon', value: ClickIconEvent): void;
function dispatcher(
  command: 'unhover-taskbar-icon',
  value: ClickIconEvent,
): void;
function dispatcher(command: 'hover-taskbar-preview', value: boolean): void;
function dispatcher(
  command: string,
  value?: boolean | string | Partial<Options> | ClickIconEvent,
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
      const { type } = value as ClickIconEvent;
      // maybe we need a proxy to create window component.
      if (type === 'window') {
        eventPipe.next({
          name: 'proxy-operation',
          id: 'desktop-icon',
          data: { ...(value as ClickIconEvent) },
        });
      }
      break;
    }
    case 'click-taskbar-icon': {
      const { type } = value as ClickIconEvent;
      if (type === 'window') {
        eventPipe.next({
          name: 'proxy-operation',
          id: 'taskbar-icon',
          data: { ...(value as ClickIconEvent) },
        });
      }
      break;
    }
    case 'hover-taskbar-icon': {
      console.log('[hover-taskbar-icon]: ', value);
      const { name } = value as ClickIconEvent;
      store.updateState('taskbarPreview', name);
      break;
    }
    case 'unhover-taskbar-icon': {
      // skip if mouse is hovering the preview float menu
      if (store.getStateValue('hoverPreview')) return;
      store.updateState('taskbarPreview', 'none');
      break;
    }
    case 'hover-taskbar-preview': {
      const state = value as boolean;
      store.updateState('hoverPreview', state);
      if (!state) {
        store.updateState('taskbarPreview', 'none');
      }
      break;
    }
    default:
      break;
  }
}

type ProxyOperation = 'proxy-operation';

type PipeEventType =
  | 'open-window'
  | 'close-window'
  | 'maximize-window'
  | 'minimize-window'
  | ProxyOperation; // for operation transition

export type PipeEvent = {
  id: string;
  name: PipeEventType;
  data?: Record<string, unknown>;
};

// this instance can be used in this module.
const eventPipe = new Subject<PipeEvent>();

// this instance can be used in this module.
const windowManager = new WindowManager(eventPipe);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore // debug
window.windowManager = windowManager;

const defaultContext: WindowContextType = {
  dispatcher,
  event$: eventPipe,
  windowManager,
  desktopContainer: {} as HTMLDivElement,
};

export function makeContextValue() {
  return defaultContext;
}

export const WindowContext = createContext<WindowContextType>(defaultContext);
