import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import { type FC, useState } from 'react';

import { noop } from '../../utils/helper';

type RefCallbackType = (setActivatorNodeRef: HTMLElement | null) => void;

interface IProps {
  id: string;
  className?: string;
  disabled?: boolean;
  children:
    | React.ReactNode
    | string
    | ((
        setActivatorNodeRef: RefCallbackType,
        setDraggable: (value: boolean) => void,
      ) => React.ReactNode);
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  data?: Record<string, Any>;
}

export const SortableItem: FC<IProps> = ({
  id,
  children,
  disabled,
  className,
  onMouseOver = noop,
  onMouseLeave = noop,
  data = {},
}) => {
  const [draggable, setDraggable] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id, disabled: disabled || !draggable });

  const style = {
    // use CSS.Translate, not CSS.Transform. transform will stretch the size of element.
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      className={classNames(className)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={style}
      {...data}
    >
      {typeof children === 'function'
        ? children(setActivatorNodeRef, setDraggable)
        : children}
    </div>
  );
};
