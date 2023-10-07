import {
  CloseOutlined,
  CropSquareOutlined,
  Minimize,
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable, { type DraggableEventHandler } from 'react-draggable';

import { PipeEvent, store } from '../../context/store';
import { useWindowContext } from '../../hooks';
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
  size,
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { windowManager } = useWindowContext();

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: pos[0],
    y: pos[1],
  });

  function getWindowHandler() {
    return windowManager.getWindow(id);
  }

  // const handleStart = (e) => {
  //   // console.log('start', e);
  // };
  // const handleDrag = (e) => {
  //   // console.log('drag', e);
  // };
  const handleStop: DraggableEventHandler = (_, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  function handleMinimize() {
    const handler = getWindowHandler();
    handler.minimize();
  }
  function handleMaximize() {
    const handler = getWindowHandler();
    handler.maximize();
  }
  function handleClose() {
    const handler = getWindowHandler();
    handler.close();
  }

  return (
    <Draggable
      axis="both"
      handle=".window-header"
      defaultPosition={{ x: 0, y: 0 }}
      position={position}
      grid={[5, 5]}
      scale={1}
      // onStart={handleStart}
      // onDrag={handleDrag}
      onStop={handleStop}
    >
      <div
        style={{
          width: size[0],
          height: size[1],
          zIndex,
        }}
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

  useEffect(() => {
    const event$ = store.getEventPipe();
    const handler = ({ name, value }: PipeEvent) => {
      console.log('name,', name, value);
      const handler = windowManager.getWindow(value.id);
      switch (name) {
        case 'open-window': {
          setWindows((a) => [...a, handler.window]);
          break;
        }
        case 'close-window': {
          setWindows((w) => {
            const ww = w.filter((i) => i !== handler.window);
            return ww;
          });
          break;
        }
        default:
          break;
      }
    };

    const subscription = event$.subscribe((event) => {
      handler(event);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [windowManager]);

  return <>{windows.map((child) => createPortal(child, desktopContainer))}</>;
}
