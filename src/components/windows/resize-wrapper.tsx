import { Resizable, type ResizeCallback } from 're-resizable';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useEventListener, useWindowContext } from '../../hooks';

interface ResizableWrapperProps {
  onResize: (width: number, height: number) => void;
  children: React.ReactNode;
  id: string;
  size: [number, number];
}

const ResizeContainer = styled.div<{ $width; $height }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  border: 1px solid green;
  position: relative;
`;

const ResizableWrapper: React.FC<ResizableWrapperProps> = ({
  onResize,
  children,
  id,
  size: si,
}) => {
  const { desktopContainer } = useWindowContext();

  const [size, setSize] = useState<[number, number]>(si);

  const handleResize: ResizeCallback = (e, d, ref, size) => {
    console.log('e, data', size);
    onResize(size.width, size.height);
    setSize([size.width, size.height]);
  };

  useEventListener(id, [
    {
      event: 'maximize-window',
      handler() {
        const { width, height } = desktopContainer.getBoundingClientRect();
        onResize(width, height);
      },
    },
    {
      event: 'minimize-window',
      handler() {
        onResize(0, 0);
      },
    },
  ]);

  return (
    <Resizable
      onResizeStop={handleResize}
      className="flex w-full h-full relative"
    >
      <ResizeContainer className={'flex'} $width={size[0]} $height={size[1]}>
        {children}
      </ResizeContainer>
    </Resizable>
  );
};

export default ResizableWrapper;
