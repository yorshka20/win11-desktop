import { useContext } from 'react';

import { WindowContext } from './context';

export function useWindowContext() {
  return useContext(WindowContext);
}
