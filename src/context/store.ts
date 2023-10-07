import {
  BehaviorSubject,
  type Observable,
  Subject,
  type Subscription,
  map,
} from 'rxjs';

export interface ContextStoreState {
  window: string;
  time: number;
  showStartMenu: boolean;
  showContextMenu: boolean;
}

type ContextKey = keyof ContextStoreState;

type ContextValue<T extends ContextKey> = ContextStoreState[T];

type StateSubscribeCallback<T extends keyof ContextStoreState> = (
  v: ContextStoreState[T],
) => void;

type PipeEvent = {
  name: string;
  value: any;
};

export class ContextStore {
  private state$: BehaviorSubject<ContextStoreState>;

  private event$: Subject<PipeEvent> = new Subject();

  private get value() {
    return this.state$.value;
  }

  constructor(defaultState: ContextStoreState) {
    this.state$ = new BehaviorSubject(defaultState);

    // test
    setInterval(() => {
      this.updateState('time', Date.now());
    }, 1000);
  }

  getValue() {
    return this.value;
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

  getEventPipe() {
    return this.event$;
  }

  dispatchEvent(event: PipeEvent) {
    this.event$.next(event);
  }
}

export const store = new ContextStore({
  window: 'main',
  time: Date.now(),
  showStartMenu: false,
  showContextMenu: false,
});
