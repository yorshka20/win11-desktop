import { createContext } from 'react';
import { useContext } from 'react';
import { Subject } from 'rxjs';

import type { TaskbarConfigItem, WindowType } from '../types';
import { store } from './store';
import { type Options, WindowManager } from './window-manager';

export interface WindowContextType {
  dispatcher: typeof dispatcher;
  windowManager: WindowManager;
  event$: Subject<PipeEvent>;
  desktopContainer: HTMLDivElement;
}

type ClickIconEvent = {
  name: WindowType | string;
  type: 'window' | 'modal';
};

// merged types for dispatcher
type ReloadValueType =
  | boolean
  | string
  | Partial<Options>
  | ClickIconEvent
  | TaskbarConfigItem;

function dispatcher(command: 'display-start-menu', value?: boolean): void;
function dispatcher(command: 'display-context-menu', value?: boolean): void;
function dispatcher(command: 'click-desktop-icon', value: ClickIconEvent): void;
function dispatcher(command: 'click-taskbar-icon', value: ClickIconEvent): void;
function dispatcher(command: 'hover-taskbar-icon', value: ClickIconEvent): void;
function dispatcher(
  command: 'add-taskbar-icon',
  value: TaskbarConfigItem,
): void;
function dispatcher(
  command: 'unhover-taskbar-icon',
  value: ClickIconEvent,
): void;
function dispatcher(command: 'select-desktop-icon', value: string): void;
function dispatcher(command: 'hover-taskbar-preview', value: boolean): void;
/**
 * Executes different actions based on the provided command.
 *
 * store operations should be done here by default.
 *
 * @param {string} command - The command to be executed.
 * @param {ReloadValueType} [value] - The value associated with the command.
 */
function dispatcher(command: string, value?: ReloadValueType) {
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
    case 'select-desktop-icon': {
      store.updateState('selectedDesktopIcons', [value as string]);
      break;
    }
    case 'hover-taskbar-icon': {
      const { name } = value as ClickIconEvent;
      store.updateState('taskbarPreview', name as WindowType);
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
    case 'add-taskbar-icon': {
      const currentTaskBarIcons = store.getStateValue('taskBarIcons');
      const { name } = value as TaskbarConfigItem;
      if (!currentTaskBarIcons.some((i) => i.name === name)) {
        store.updateState('taskBarIcons', [
          ...currentTaskBarIcons,
          value as TaskbarConfigItem,
        ]);
      }
      break;
    }
    case 'delete-taskbar-icon': {
      const list = store.getStateValue('taskBarIcons');
      store.updateState(
        'taskBarIcons',
        list.filter((item) => item.name !== (value as TaskbarConfigItem).name),
      );
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
  data?: Record<string, unknown> | ClickIconEvent;
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

export function useWindowContext() {
  return useContext(WindowContext);
}
