import { Resizable, type ResizeCallback } from 're-resizable';
import React from 'react';

import { useWindowContext } from '../../../hooks';
import type { Size } from '../../../types';
import { createLogger } from '../../../utils/logger';

interface ResizableWrapperProps {
  id: string;
  size: Size;
  className?: string;

  children: React.ReactNode;
  onResize: (width: number, height: number) => void;
}

const logger = createLogger('ResizableWrapper');

const Wrapper: React.FC<ResizableWrapperProps> = ({
  id,
  size,
  className = '',
  onResize,
  children,
}) => {
  const { windowManager } = useWindowContext();

  const handleResize: ResizeCallback = (...args) => {
    logger('handleResize', args);
    const s = args[3];

    const width = Math.round(size[0] + s.width);
    const height = Math.round(size[1] + s.height);

    windowManager.updateWindowState(id, 'size', [width, height]);

    onResize(width, height);
  };

  return (
    <Resizable
      minHeight={400}
      minWidth={600}
      onResizeStop={handleResize}
      bounds={'window'}
      size={{ width: size[0], height: size[1] }}
      data-id={'resize-wrapper'}
      className={`flex flex-1 flex-col w-full h-full relative ${className}`}
    >
      {children}
    </Resizable>
  );
};

export const ResizableWrapper = React.memo(Wrapper);
