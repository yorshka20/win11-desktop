import { BehaviorSubject, type Subscription } from 'rxjs';

type RxStoreContent = Record<string, unknown>;

type StateSubscriptionMap<State, T extends keyof State = keyof State> = {
  [key in T]?: BehaviorSubject<State[T]>;
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
    this.stateSubscription[key]?.next(value);
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

    const value = this.value[key];
    const subject = new BehaviorSubject<State[keyof State]>(value);
    const subscription = subject.subscribe((v) => fn(v as State[T]));
    this.stateSubscription[key] = subject;

    return subscription;
  }

  destroy() {
    this.state$.complete();
    for (const sub in this.stateSubscription) {
      this.stateSubscription[sub]?.complete();
    }
  }
}
