import { Resizable, type ResizeCallback } from 're-resizable';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useEventListener, useWindowContext } from '../../hooks';
import { Size } from '../../types';

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
  size;
  const { desktopContainer, windowManager } = useWindowContext();

  const [winSize, setWinSize] = useState<[number, number]>(size);

  const handleResize: ResizeCallback = (e, _, ref, size) => {
    console.log('e, data', size);
    setWinSize([size.width, size.height]);

    onResize(size.width, size.height);
    windowManager.updateWindowState(id, 'size', [size.width, size.height]);
  };

  useEventListener(id, [
    {
      event: 'maximize-window',
      handler() {
        const { width, height } = desktopContainer.getBoundingClientRect();
        windowManager.updateWindowState(id, 'size', [width, height]);
      },
    },
    {
      event: 'minimize-window',
      handler() {
        onResize(0, 0);
        windowManager.updateWindowState(id, 'size', [0, 0]);
      },
    },
  ]);

  return (
    <Resizable
      defaultSize={{
        width: size[0],
        height: size[1],
      }}
      onResizeStop={handleResize}
      bounds={'parent'}
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
