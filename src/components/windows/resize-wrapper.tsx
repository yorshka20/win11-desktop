import React from 'react';
import { Resizable } from 'react-resizable';

interface ResizableWrapperProps {
  onResize: (width: number, height: number) => void;
  children: React.ReactNode;
}

const ResizableWrapper: React.FC<ResizableWrapperProps> = ({
  onResize,
  children,
}) => {
  const handleResize = (
    _: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } },
  ) => {
    onResize(size.width, size.height);
  };

  return (
    <Resizable onResize={handleResize} draggableOpts={{ grid: [10, 10] }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #ccc',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </Resizable>
  );
};

export default ResizableWrapper;
