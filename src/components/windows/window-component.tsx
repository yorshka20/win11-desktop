import {
  CloseOutlined,
  CropSquareOutlined,
  Minimize,
} from '@mui/icons-material';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable, { type DraggableEventHandler } from 'react-draggable';

import { useEventListener, useWindowContext } from '../../hooks';
import { Size } from '../../types';
import type { Options, WindowType } from './interface';
import './style.less';

interface WindowComponentProps extends Options {
  //
}

function WindowComponent({
  title,
  id,
  position: pos,
  zIndex,
  size: si,
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { desktopContainer, windowManager } = useWindowContext();

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: pos[0],
    y: pos[1],
  });
  const [size, setSize] = useState<Size>(si);

  function getWindowHandler() {
    return windowManager.getWindow(id);
  }

  // const handleStart = (e) => {
  //   // console.log('start', e);
  // };
  const handleDrag: DraggableEventHandler = (e, data) => {
    // console.log('drag', e, data);
    const isMaximized = windowManager.getWindowState(id, 'isMaximized');
    if (!isMaximized) return;
    if (data.y > 50) {
      windowManager.updateWindowState(id, 'isMaximized', false);
      setSize([600, 400]);

      const { width } = desktopContainer.getBoundingClientRect();
      const { clientX } = e as MouseEvent;
      setPosition({
        x: Math.round(clientX - (clientX / width) * 600),
        y: data.y,
      });
    }
  };

  const handleStop: DraggableEventHandler = (_, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  function handleFocusWindow() {
    windowManager.updateWindowState(id, 'isActive', true);
  }

  function handleMinimize() {
    const handler = getWindowHandler();
    handler.minimize();
    windowManager.updateWindowState(id, 'isMinimized', true);
  }
  function handleMaximize() {
    const handler = getWindowHandler();
    handler.maximize();
    windowManager.updateWindowState(id, 'isMaximized', true);
  }
  function handleClose() {
    const handler = getWindowHandler();
    handler.close();
    windowManager.updateWindowState(id, 'isActive', false);
  }

  useEventListener([
    {
      event: 'maximize-window',
      handler() {
        const { width, height } = desktopContainer.getBoundingClientRect();
        setSize([width, height]);
        setPosition({ x: 0, y: 0 });
      },
    },
  ]);

  return (
    <Draggable
      axis="both"
      handle=".window-header"
      defaultPosition={{ x: 0, y: 0 }}
      position={position}
      grid={[5, 5]}
      scale={1}
      // onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div
        style={{
          width: size[0],
          height: size[1],
          zIndex,
        }}
        onClick={handleFocusWindow}
        title={title}
        className="flex flex-col window-component-container"
      >
        <header
          ref={headerRef}
          className="window-header flex flex-row justify-between items-center w-full"
        >
          <div className="tabs"></div>
          <div className="buttons flex flex-row justify-between items-center">
            <Minimize onClick={handleMinimize} className="icon min" />
            <CropSquareOutlined onClick={handleMaximize} className="icon max" />
            <CloseOutlined onClick={handleClose} className="icon close" />
          </div>
        </header>
        <div className="window-toolbar w-full">1111</div>
        <div className="window-content flex-1">{content}</div>
      </div>
    </Draggable>
  );
}

export function createWindow(windowType: WindowType, options: Options) {
  console.log('options in create window', windowType, options);

  return <WindowComponent {...options} />;
}

export function WindowComponentContainer() {
  const { desktopContainer, windowManager } = useWindowContext();

  const [windows, setWindows] = useState<React.JSX.Element[]>([]);

  useEventListener([
    {
      event: 'close-window',
      handler(e) {
        const handler = windowManager.getWindow(e.value.id);
        setWindows((w) => w.filter((i) => i !== handler.window));
      },
    },
    {
      event: 'open-window',
      handler(e) {
        const handler = windowManager.getWindow(e.value.id);
        setWindows((a) => [...a, handler.window]);
      },
    },
  ]);

  return <>{windows.map((child) => createPortal(child, desktopContainer))}</>;
}
