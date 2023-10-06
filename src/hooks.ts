import { useContext, useEffect, useState } from 'react';

import { ContextStoreState, WindowContext } from './context/context';

export function useWindowContext() {
  return useContext(WindowContext);
}

export function useContextState<T extends keyof ContextStoreState>(
  key: T,
): ContextStoreState[T] {
  const { store } = useWindowContext();
  const defaultValue = store.getState()[key];
  const [state, setState] = useState<ContextStoreState[T]>(defaultValue);

  useEffect(() => {
    const subscription = store.subscribeState(key, setState);
    return () => {
      subscription.unsubscribe();
    };
  }, [store, key]);

  return state;
}
