import { useEffect } from 'react';
import { filter } from 'rxjs';

import { type PipeEvent, useWindowContext } from '../context/context';

type EventListenerPair = {
  event: PipeEvent['name'];
  handler: (id: string, e: PipeEvent) => void;
}[];

/**
 * subscribe window events
 *
 * if `id` = '*', events from all windows will be handled.
 *
 * @export
 * @param {string} id
 * @param {EventListenerPair} pairs
 */
export function useEventListener(id: string | '*', pairs: EventListenerPair) {
  const { event$ } = useWindowContext();

  useEffect(() => {
    const events: PipeEvent['name'][] = [];
    const eventMap = {} as Record<
      PipeEvent['name'],
      EventListenerPair[number]['handler']
    >;

    pairs.forEach((pair) => {
      events.push(pair.event);
      eventMap[pair.event] = pair.handler;
    });

    const subscription = event$
      .pipe(
        // if id === '*', do not filter.
        filter((i) => (id === '*' ? true : i.id === id)),
        filter((i) => events.includes(i.name)),
      )
      .subscribe((e) => eventMap[e.name](e.id, e));

    return () => {
      subscription.unsubscribe();
    };
  }, [id, pairs, event$]);
}
