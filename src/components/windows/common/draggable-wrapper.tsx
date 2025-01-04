import { DragEndEvent, useDndMonitor, useDraggable } from '@dnd-kit/core';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { type DraggableEventHandler } from 'react-draggable';
import { styled } from 'styled-components';

import { useWindowContext } from '../../../hooks';
import { Position, Size } from '../../../types';
import { noop } from '../../../utils/helper';

const DraggableWindowContainer = styled.div<{ $zIndex }>`
  position: fixed;

  min-width: 400px;
  min-height: 400px;

  background-color: rgb(240, 248, 255);
  border-radius: 6px;

  z-index: ${(props) => props.$zIndex};
`;

export interface CommonWindowWrapperProps {
  id: string;
  title: string;
  position: Position;
  zIndex: number;
  isMaximized: boolean;
  size?: Size;

  disabled?: boolean;

  className?: string;

  // onMinimize?: () => void;
  // onMaximize?: () => void;
  // onClose?: () => void;

  handle?: string;
  cancel?: string;
  onDragStart?: DraggableEventHandler;
  onDrag?: DraggableEventHandler;
  onDragStop?: DraggableEventHandler;

  children: React.JSX.Element;
}

export const DraggableWindowWrapper = React.forwardRef<
  HTMLElement,
  CommonWindowWrapperProps
>(function (props, ref) {
  const {
    id,
    title,
    zIndex,
    isMaximized,
    className = '',
    onDrag = noop,
    onDragStart = noop,
    onDragStop = noop,
    cancel,
    children,
  } = props;

  const { windowManager } = useWindowContext();

  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const [disabled, setDisabled] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    setPosition(([x, y]) => [x + event.delta.x, y + event.delta.y]);

    windowManager.updateWindowState(id, 'position', position);
    // onDragStop(event, event.data);
  };

  useDndMonitor({
    onDragEnd: disabled || !open ? noop : handleDragEnd,
  });

  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    setActivatorNodeRef,
    transform,
  } = useDraggable({
    id: `window:${id}`,
    disabled,
  });

  const [transformStyle, setTransformStyle] = useState<string>(
    'translate3d(0, 0, 0)',
  );

  useEffect(() => {
    if (transform) {
      setTransformStyle(`translate3d(${transform.x}px, ${transform.y}px, 0)`);
    } else {
      setTransformStyle('translate3d(0, 0, 0)');
    }
  }, [transform]);

  `
  todo:
  - draggable handler is not correct when using nodeRef.
  `;

  const handleClickWindow = (e: React.SyntheticEvent<HTMLElement>) => {
    const id = e.target['dataset']?.['testid'];
    console.log('focus window: id', e.target['dataset'], id);
    if (id === 'MinimizeIcon' || id === 'CloseOutlinedIcon') {
      return;
    }

    windowManager.focusWindow(id);
  };

  return (
    <DraggableWindowContainer
      title={title}
      style={{
        transform: isDragging ? transformStyle : 'translate3d(0, 0, 0)',
        top: position[1],
        left: position[0],
      }}
      $zIndex={zIndex}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className={classNames(
        'flex flex-col window-component-container',
        isMaximized && 'fullscreen-state',
        className,
      )}
      onClick={handleClickWindow}
    >
      {children}
    </DraggableWindowContainer>
  );
});
