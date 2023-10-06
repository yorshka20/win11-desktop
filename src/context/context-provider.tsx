import { useMemo } from 'react';

import type { WindowContextType } from './context';
import { WindowContext, makeContextValue } from './context';

export function WindowContextProvider({ children }: { children: JSX.Element }) {
  const contextValue: WindowContextType = useMemo(() => makeContextValue(), []);

  return (
    <WindowContext.Provider value={contextValue}>
      {children}
    </WindowContext.Provider>
  );
}
