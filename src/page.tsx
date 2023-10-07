import { useEffect, useRef } from 'react';

import { useContextMenu, useDesktopSelection } from './hooks';

export interface DesktopItem {
  name: string;
  icon: string;
}

interface DesktopContainerProps {
  desktopConfig: DesktopItem[];
}

export function DesktopContainer({ desktopConfig }: DesktopContainerProps) {
  const desktopRef = useRef<HTMLDivElement>(null);

  const selectionArea = useDesktopSelection(desktopRef);

  useContextMenu();

  useEffect(() => {
    // console.log('selectionArea', selectionArea);
  }, [selectionArea]);

  return (
    <div
      ref={desktopRef}
      id="desktop"
      className="flex-1 flex flex-col desktop-container"
    >
      {desktopConfig.map((c, index) => (
        <span key={index}>{c.name}</span>
      ))}

      <div id="desktop-selection" className="desktop-selection" />
      <div id="context-menu" className="context-menu-container"></div>
    </div>
  );
}
