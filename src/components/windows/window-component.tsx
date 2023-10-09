import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable, { type DraggableEventHandler } from 'react-draggable';

import {
  type WindowState,
  getDefaultWindowState,
} from '../../context/window-manager';
import { useEventListener, useWindowContext } from '../../hooks';
import { Position, Size } from '../../types';
import { noop } from '../../utils/helper';

/**
 * createPortal at the Desktop root.
 *
 * new window component will be mounted at Desktop.
 *
 * `close-window` and `open-window` will be handled here.
 *
 * @export
 * @return {*}
 */
export function WindowComponentContainer() {
  const { desktopContainer, windowManager } = useWindowContext();

  const [windows, setWindows] = useState<React.JSX.Element[]>([]);

  useEventListener('*', [
    {
      event: 'close-window',
      handler(id) {
        const handler = windowManager.getWindow(id);
        // since we still need to use the handler
        setWindows((w) => w.filter((i) => i !== handler.window));
        // we should delete the window after we have unmounted it.
        windowManager.deleteWindow(id);
      },
    },
    {
      event: 'open-window',
      handler(id) {
        // windows are store in windowManager.
        const handler = windowManager.getWindow(id);
        setWindows((a) => [...a, handler.window]);
      },
    },
  ]);

  return <>{windows.map((child) => createPortal(child, desktopContainer))}</>;
}

export interface CommonWindowWrapperProps {
  id: string;
  title: string;
  size: Size;
  position: Position;
  zIndex: number;

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
  size: si,
  position: pos,
  zIndex,
  // nodeRef,
  handle,
  onDrag = noop,
  onDragStart = noop,
  onDragStop = noop,
  cancel,
  children,
}: CommonWindowWrapperProps) {
  // const dragRef = useMemo(() => nodeRef(), [nodeRef]);
  const { desktopContainer, windowManager } = useWindowContext();

  const [position, setPosition] = useState<Position>(pos);
  const [size, setSize] = useState<Size>(si);

  const [windowState, setWindowState] = useState<WindowState>(dState);

  useEffect(() => {
    const sub = windowManager.subscribeState(id, setWindowState);
    return () => sub.unsubscribe();
  }, [windowManager, id]);

  onDrag;

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

  console.log('position]', ...position);

  useEventListener(id, [
    {
      event: 'maximize-window',
      handler() {
        const { width, height } = desktopContainer.getBoundingClientRect();
        setSize([width, height]);
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
      <div
        style={{
          width: size[0],
          height: size[1],
          zIndex,
        }}
        title={title}
        className={classNames(
          'flex flex-col w-full h-full window-component-container',
          windowState.isMaximized && 'fullscreen-state',
        )}
      >
        {Array.isArray(children) ? <>{...children}</> : children}
      </div>
    </Draggable>
  );
}
