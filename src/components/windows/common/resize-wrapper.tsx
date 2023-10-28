import { Resizable, type ResizeCallback } from 're-resizable';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useWindowContext } from '../../../hooks';
import type { Size } from '../../../types';
import { useWindowResize } from '../hooks';

interface ResizableWrapperProps {
  onResize: (width: number, height: number) => void;
  children: React.ReactNode;
  id: string;
  size: Size;
}

const ResizeContainer = styled.div`
  border: 1px solid green;
  position: relative;
`;

const ResizableWrapper: React.FC<ResizableWrapperProps> = ({
  onResize,
  children,
  id,
  size,
}) => {
  const { windowManager } = useWindowContext();

  const [winSize, setWinSize] = useState<[number, number]>(size);

  const handleResize: ResizeCallback = (...args) => {
    const size = args[3];
    // console.log('e, data', args, size);
    const width = winSize[0] + size.width;
    const height = winSize[1] + size.height;
    setWinSize([width, height]);

    onResize(width, height);
    windowManager.updateWindowState(id, 'size', [width, height]);
  };

  // subscribe to windowManager for window resize pipeEvent
  useWindowResize(id);

  return (
    <Resizable
      defaultSize={{
        width: size[0],
        height: size[1],
      }}
      minHeight={400}
      minWidth={600}
      onResizeStop={handleResize}
      bounds={'window'}
      size={{ width: winSize[0], height: winSize[1] }}
      className="flex w-full h-full relative"
    >
      <ResizeContainer className={'flex w-full h-full flex-1'}>
        {children}
      </ResizeContainer>
    </Resizable>
  );
};

export default ResizableWrapper;
