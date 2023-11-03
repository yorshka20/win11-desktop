import { Resizable, type ResizeCallback } from 're-resizable';
import React from 'react';
import styled from 'styled-components';

import { useWindowContext } from '../../../hooks';
import type { Size } from '../../../types';
import { createLogger } from '../../../utils/logger';

interface ResizableWrapperProps {
  onResize: (width: number, height: number) => void;
  children: React.ReactNode;
  id: string;
  size: Size;
}

const ResizeContainer = styled.div`
  /* border: 1px solid green; */
  position: relative;

  display: flex;
`;

const logger = createLogger('ResizableWrapper');

const ResizableWrapper: React.FC<ResizableWrapperProps> = ({
  onResize,
  children,
  id,
  size,
}) => {
  const { windowManager } = useWindowContext();

  const handleResize: ResizeCallback = (...args) => {
    logger('handleResize', args);
    const s = args[3];

    // try to avoid using getBoundingClientRect

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
      className="flex w-full h-full relative"
    >
      <ResizeContainer className={'flex w-full h-full flex-1'}>
        {children}
      </ResizeContainer>
    </Resizable>
  );
};

export default ResizableWrapper;
