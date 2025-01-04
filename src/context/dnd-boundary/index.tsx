import {
  DndContext,
  KeyboardSensor as LibKeyboardSensor,
  MouseSensor as LibMouseSensor,
  closestCenter,
  useSensor,
  useSensors,
  type Modifier,
} from '@dnd-kit/core'
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const DraggableBoundary = ({ children }: IProps) => {
  // dnd-kit
  const mouseSensor = useSensor(MouseSensor)
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor)

  return (
    <DndContext
      modifiers={[restrictToContainerRect]}
      collisionDetection={closestCenter}
      sensors={sensors}
      autoScroll={false}
    >
      {children}
    </DndContext>
  )
}

const restrictToContainerRect: Modifier = ({ draggingNodeRect, transform }) => {
  if (!draggingNodeRect) {
    return transform
  }

  const HEADER_HEIGHT = 48
  const { width, height } = draggingNodeRect

  // limit the draggable area to the container excluding header
  return {
    ...transform,
    x:
      draggingNodeRect.left + transform.x < 0
        ? -draggingNodeRect.left
        : draggingNodeRect.left + transform.x > window.innerWidth - width
          ? window.innerWidth - draggingNodeRect.left - width
          : transform.x,
    y:
      draggingNodeRect.top + transform.y < HEADER_HEIGHT
        ? HEADER_HEIGHT - draggingNodeRect.top // moving up
        : draggingNodeRect.bottom + transform.y > window.innerHeight
          ? window.innerHeight - draggingNodeRect.top - height // touching bottom line
          : transform.y, // moving between bottom and top
  }
}

class MouseSensor extends LibMouseSensor {
  static activators = [
    {
      eventName: 'onMouseDown' as const,
      handler: ({ nativeEvent: event }: MouseEvent) => {
        return shouldHandleEvent(event.target as HTMLElement)
      },
    },
  ]
}

class KeyboardSensor extends LibKeyboardSensor {
  static activators = [
    {
      eventName: 'onKeyDown' as const,
      handler: ({ nativeEvent: event }: KeyboardEvent<Element>) => {
        return shouldHandleEvent(event.target as HTMLElement)
      },
    },
  ]
}

/**
 * Checks if the given element or any of its parent elements have the 'noDnd' dataset property.
 *
 * if you want to skip dnd on an element,
 * set the `data-no-dnd=true` to the element
 *
 * @param {HTMLElement | null} element - The element to start checking from.
 * @return {boolean} Returns true if the element or any of its parents do not have the 'noDnd' dataset property, otherwise false.
 */
function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }

  return true
}

export { useDndSortableList } from './hook'
export { SortableItem } from './sortable-item'
