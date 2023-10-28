import { useEffect, useState } from 'react';

import { type ContextState, store } from '../context/store';

export function useContextState<T extends keyof ContextState>(
  key: T,
): ContextState[T] {
  const defaultValue = store.getStateValue(key);
  const [state, setState] = useState<ContextState[T]>(defaultValue);

  useEffect(() => {
    const subscription = store.subscribeState(key, setState);
    return () => {
      subscription.unsubscribe();
    };
  }, [key]);

  return state;
}
