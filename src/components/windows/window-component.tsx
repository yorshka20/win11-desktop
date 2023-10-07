import {
  CloseOutlined,
  CropSquareOutlined,
  Minimize,
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable, { type DraggableEventHandler } from 'react-draggable';

import { store } from '../../context/store';
import { useWindowContext } from '../../hooks';
import type { Options, WindowType } from './interface';
import './style.less';

interface WindowComponentProps extends Options {
  //
}

function WindowComponent({
  title,
  position: pos,
  zIndex,
  size,
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: pos[0],
    y: pos[1],
  });

  // const handleStart = (e) => {
  //   // console.log('start', e);
  // };
  // const handleDrag = (e) => {
  //   // console.log('drag', e);
  // };
  const handleStop: DraggableEventHandler = (_, data) => {
    setPosition({ x: data.x, y: data.y });
  };

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
            <Minimize className="icon min" />
            <CropSquareOutlined className="icon max" />
            <CloseOutlined className="icon close" />
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
  const { desktopContainer } = useWindowContext();

  const [windows, setWindows] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    const event$ = store.getEventPipe();
    const handler = ({
      name,
      value,
    }: {
      name: string;
      value: Options & {
        windowType: WindowType;
      };
    }) => {
      console.log('name,', name, value);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = createWindow(value.windowType, value.options as any);
      setWindows((a) => [...a, win]);
    };

    const subscription = event$.subscribe((event) => {
      handler(event);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <>{windows.map((child) => createPortal(child, desktopContainer))}</>;
}
