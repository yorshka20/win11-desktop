import { type DragEndEvent, useDndMonitor } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { noop } from '../../utils/helper';

export function useDndSortableList<
  T extends { id: string; [key: PropertyKey]: Any },
>(list: T[], onUpdate: (list: T[]) => void, enableDnd: boolean) {
  useDndMonitor({
    // unmount handler when not enabling dnd.
    onDragEnd: enableDnd ? handleDragEnd : noop,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id === over?.id) {
      return;
    }

    const oldIndex = list.findIndex((i) => i.id === active.id);
    const newIndex = list.findIndex((i) => i.id === over?.id);
    if (oldIndex === newIndex || oldIndex === -1 || newIndex === -1) {
      return;
    }

    onUpdate(arrayMove(list, oldIndex, newIndex));
  }
}
