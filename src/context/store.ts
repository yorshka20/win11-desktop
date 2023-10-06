import { BehaviorSubject, type Observable, type Subscription, map } from 'rxjs';

export interface ContextStoreState {
  window: string;
  time: number;
  showStartMenu: boolean;
}

type ContextKey = keyof ContextStoreState;

type ContextValue = ContextStoreState[ContextKey];

type StateSubscribeCallback<T extends keyof ContextStoreState> = (
  v: ContextStoreState[T],
) => void;

export class ContextStore {
  private state$: BehaviorSubject<ContextStoreState>;

  constructor(defaultState: ContextStoreState) {
    this.state$ = new BehaviorSubject(defaultState);

    // test
    setInterval(() => {
      this.updateState('time', Date.now());
    }, 1000);
  }

  updateState<T extends ContextKey>(key: T, value: ContextValue) {
    this.state$.next({
      ...this.getState(),
      [key]: value,
    });
  }

  getState() {
    return this.state$.getValue();
  }

  getState$<T extends keyof ContextStoreState>(
    key: T,
  ): Observable<ContextValue> {
    return this.state$.pipe(map((i) => i[key]));
  }

  subscribeState<T extends ContextKey>(
    key: T,
    callback: StateSubscribeCallback<T>,
  ): Subscription {
    const subscription = this.state$
      .pipe(map((i) => i[key]))
      .subscribe(callback);
    return subscription;
  }
}

export const store = new ContextStore({
  window: 'main',
  time: Date.now(),
  showStartMenu: false,
});
