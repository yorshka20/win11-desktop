import React from 'react';

import { type ContextStore, store } from './store';

export interface WindowContextType {
  theme: 'light' | 'dark';
  store: ContextStore;
}

const defaultContext: WindowContextType = {
  theme: 'light',
  store,
};

export function makeContextValue() {
  return defaultContext;
}

export const WindowContext =
  React.createContext<WindowContextType>(defaultContext);
