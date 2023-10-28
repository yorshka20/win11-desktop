import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Draggable, { type DraggableEventHandler } from 'react-draggable';
import { styled } from 'styled-components';

import {
  type WindowState,
  getDefaultWindowState,
} from '../../../context/window-manager';
import { useEventListener, useWindowContext } from '../../../hooks';
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

  children: React.JSX.Element[] | React.JSX.Element;
}

const dState = getDefaultWindowState();

export function DraggableWindowWrapper({
  id,
  title,
  position: pos,
  zIndex,
  // nodeRef,
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

  const [position, setPosition] = useState<Position>(pos);

  const [windowState, setWindowState] = useState<WindowState>(dState);

  useEffect(() => {
    const sub = windowManager.subscribeState(id, setWindowState);
    return () => sub.unsubscribe();
  }, [windowManager, id]);

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
    setPosition([data.x, data.y]);
  };

  // console.log('position]', ...position);

  const handleClickWindow = () => {
    windowManager.focusWindow(id);
  };

  useEventListener(id, [
    {
      event: 'maximize-window',
      handler() {
        setPosition([0, 0]);
      },
    },
    {
      event: 'minimize-window',
      handler() {
        setPosition([9999, 9999]);
      },
    },
  ]);

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
        $zIndex={windowState.zIndex}
        title={title}
        className={classNames(
          'flex flex-col window-component-container',
          windowState.isMaximized && 'fullscreen-state',
          className,
        )}
        onClick={handleClickWindow}
      >
        {Array.isArray(children) ? <>{...children}</> : children}
      </DraggableWindowContainer>
    </Draggable>
  );
}
