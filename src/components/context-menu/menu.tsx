import React, { useEffect, useState } from 'react';

import type { Position } from '../../types';

interface ContextMenuProps {
  children: React.JSX.Element;
  position: Position;
  show: boolean;
}

export function ContextMenu(props: ContextMenuProps) {
  const { children, position, show } = props;

  const [pos, setPos] = useState<Position>(position);

  useEffect(() => {
    setPos([...position]);
  }, [position]);

  useEffect(() => {
    const hide = () => {
      setPos([9999, 9999]);
    };

    !show && hide();
  }, [show]);

  return (
    <div
      style={{
        left: pos[0],
        top: pos[1],
      }}
      id="context-menu"
      className="flex flex-col items-start justify-start context-menu-container"
    >
      {children}
    </div>
  );
}
