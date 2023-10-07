import { BehaviorSubject, type Observable, type Subscription, map } from 'rxjs';

export interface ContextStoreState {
  theme: 'light' | 'dark';
  activeWindow: string;
  showStartMenu: boolean;
  showContextMenu: boolean;
  showSystemPreference: boolean;
}

type ContextKey = keyof ContextStoreState;

type ContextValue<T extends ContextKey> = ContextStoreState[T];

type StateSubscribeCallback<T extends keyof ContextStoreState> = (
  v: ContextStoreState[T],
) => void;

type PipeEventType =
  | 'open-window'
  | 'close-window'
  | 'maximize-window'
  | 'minimize-window';

export type PipeEvent = {
  name: PipeEventType;
  value: {
    id: string;
  };
};

export class ContextStore {
  private state$: BehaviorSubject<ContextStoreState>;

  private get value() {
    return this.state$.value;
  }

  constructor(defaultState: ContextStoreState) {
    this.state$ = new BehaviorSubject(defaultState);
  }

  updateState<T extends ContextKey>(key: T, value: ContextValue<T>) {
    this.state$.next({
      ...this.value,
      [key]: value,
    });
  }

  getStateValue<T extends ContextKey>(key: T): ContextValue<T> {
    return this.state$.value[key];
  }

  private getState$<T extends keyof ContextStoreState>(
    key: T,
  ): Observable<ContextStoreState[T]> {
    return this.state$.pipe(map((i) => i[key]));
  }

  subscribeState<T extends ContextKey>(
    key: T,
    callback: StateSubscribeCallback<T>,
  ): Subscription {
    const subscription = this.getState$(key).subscribe(callback);
    return subscription;
  }
}

export const store = new ContextStore({
  theme: 'light',
  activeWindow: 'main',
  showStartMenu: false,
  showContextMenu: false,
  showSystemPreference: false,
});
