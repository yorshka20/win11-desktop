import {
  BehaviorSubject,
  Observable,
  type Subscription,
  distinctUntilChanged,
  map,
} from 'rxjs';

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

  /**
   * Subscribe to changes in the whole state.
   *
   * for single key, please using `subscribeKey`
   *
   * @param {function} fn - The callback function to be called when the state changes.
   * @returns {Subscription} The subscription object that can be used to unsubscribe from the state changes.
   */
  subscribeState(fn: (v: State) => void): Subscription {
    const subscription = this.state$.subscribe(fn);
    return subscription;
  }

  /**
   * Subscribes to a specific key in the state and invokes the provided
   * callback function whenever the value of that key changes.
   *
   * @template T - The type of the key being subscribed to.
   * @param {T} key - The key in the state to subscribe to.
   * @param {(v: State[T]) => void} fn - The callback function to be invoked
   *   when the value of the key changes.
   * @return {Subscription} - The subscription object that can be used to
   *   unsubscribe from the key.
   */
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

    const subject = this.state$.pipe(
      map((s) => s[key]),
      distinctUntilChanged(), // deduplicate
    );
    const subscription = subject.subscribe((v) => fn(v as State[T]));
    this.stateSubscription[key] = subject;

    return subscription;
  }

  destroy() {
    this.state$.complete();
    this.stateSubscription = {};
  }
}
