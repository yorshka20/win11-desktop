import { BehaviorSubject, Observable, type Subscription, map } from 'rxjs';

export type RxStoreContent = {
  [x: string]: unknown;
};

type StateSubscriptionMap<State, T extends keyof State = keyof State> = {
  [key in T]?: Observable<State[T]>;
};

export class RxStore<State extends RxStoreContent> {
  private state$: BehaviorSubject<State>;
  private stateSubscription: StateSubscriptionMap<State>;

  private get value() {
    return this.state$.value;
  }

  constructor(defaultValue: State) {
    this.state$ = new BehaviorSubject<State>(defaultValue);
    this.stateSubscription = {};
  }

  getValue() {
    return this.value;
  }

  updateState<T extends keyof State>(key: T, value: State[T]) {
    this.state$.next({
      ...this.value,
      [key]: value,
    });
  }

  batchUpdate<T extends keyof State>(params: Record<T, State[T]>) {
    this.state$.next({
      ...this.value,
      ...params,
    });
  }

  subscribeState(fn: (v: State) => void): Subscription {
    const subscription = this.state$.subscribe(fn);
    return subscription;
  }

  subscribeKey<T extends keyof State>(
    key: T,
    fn: (v: State[T]) => void,
  ): Subscription {
    if (this.stateSubscription[key]) {
      const sub = this.stateSubscription[key]!.subscribe((v) =>
        fn(v as State[T]),
      );
      return sub;
    }

    const subject = this.state$.pipe(map((s) => s[key]));
    const subscription = subject.subscribe((v) => fn(v as State[T]));
    this.stateSubscription[key] = subject;

    return subscription;
  }

  destroy() {
    this.state$.complete();
    this.stateSubscription = {};
  }
}
