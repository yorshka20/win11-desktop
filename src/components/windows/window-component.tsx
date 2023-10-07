import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { store } from '../../context/store';
import { useWindowContext } from '../../hooks';
import type { Options, Position, Size, WindowType } from './interface';

interface WindowComponentProps {
  title: string;
  position: Position;
  size: Size;
  zIndex: number;
  content?: string;
}

function WindowComponent({
  title,
  position,
  zIndex,
  size,
  content = '',
}: WindowComponentProps) {
  return (
    <div
      style={{
        width: size[0],
        height: size[1],
        top: position[1],
        left: position[0],
        zIndex,
      }}
      className="flex window-component-container"
    >
      {title}
      <div>{content}</div>
    </div>
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
