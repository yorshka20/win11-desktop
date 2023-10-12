import React from 'react';
import { ResizableBox } from 'react-resizable';

interface Props {
  children: React.JSX.Element;
}

export function ResizableWrapper({ children }: Props) {
  return <ResizableBox handle={children} />;
}
