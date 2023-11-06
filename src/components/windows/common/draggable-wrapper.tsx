import classNames from 'classnames';
import React from 'react';
import Draggable, { type DraggableEventHandler } from 'react-draggable';
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

  className?: string;

  // onMinimize?: () => void;
  // onMaximize?: () => void;
  // onClose?: () => void;

  nodeRef?: () => React.RefObject<HTMLElement>;
  handle?: string;
  cancel?: string;
  onDragStart?: DraggableEventHandler;
  onDrag?: DraggableEventHandler;
  onDragStop?: DraggableEventHandler;

  children: React.JSX.Element;
}

export function DraggableWindowWrapper({
  id,
  title,
  position,
  zIndex,
  isMaximized,
  // nodeRef, // TODO: fix nodeRef
  className = '',
  handle,
  onDrag = noop,
  onDragStart = noop,
  onDragStop = noop,
  cancel,
  children,
}: CommonWindowWrapperProps) {
  // const dragRef = useMemo(() => nodeRef(), [nodeRef]);
  const { windowManager } = useWindowContext();

  onDrag;
  zIndex;

  // const handleDrag: DraggableEventHandler = (e, data) => {
  //   // if (data.y > 50) {
  //   //   windowManager.updateWindowState(id, 'isMaximized', false);
  //   //   setSize([600, 400]);

  //   //   const { width } = desktopContainer.getBoundingClientRect();
  //   //   const { clientX } = e as MouseEvent;
  //   //   setPosition([Math.round(clientX - (clientX / width) * 600), data.y]);
  //   // }
  //   onDrag(e, data);
  // };

  // handle move.
  const handleDragStop: DraggableEventHandler = (e, data) => {
    onDragStop(e, data);

    windowManager.updateWindowState(id, 'position', [data.x, data.y]);
  };

  const handleClickWindow = () => {
    windowManager.focusWindow(id);
  };

  return (
    <Draggable
      axis="both"
      defaultPosition={{ x: 0, y: 0 }}
      position={{ x: position[0], y: position[1] }}
      grid={[1, 1]}
      scale={1}
      handle={handle}
      onStart={onDragStart}
      // onDrag={windowState.isMaximized ? handleDrag : noop}
      onStop={handleDragStop}
      // nodeRef={nodeRef()}
      cancel={cancel}
    >
      <DraggableWindowContainer
        $zIndex={zIndex}
        title={title}
        className={classNames(
          'flex flex-col window-component-container',
          isMaximized && 'fullscreen-state',
          className,
        )}
        data-id={'drag-wrapper'}
        onClick={handleClickWindow}
      >
        {children}
      </DraggableWindowContainer>
    </Draggable>
  );
}