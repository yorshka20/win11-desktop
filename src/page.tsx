import React, { useEffect, useRef } from 'react';

import { WindowContextProvider } from './context/context-provider';
import { useContextState, useDesktopSelection } from './hooks';

interface WindowContainerProps {
  children: React.JSX.Element | React.JSX.Element[];
}

export function WindowContainer({ children }: WindowContainerProps) {
  return (
    <WindowContextProvider>
      <div
        id="window-container"
        className="flex min-w-full justify-between min-h-screen min-w-screen flex-col"
      >
        {children}
      </div>
    </WindowContextProvider>
  );
}

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

  useEffect(() => {
    console.log('selectionArea', selectionArea);
  }, [selectionArea]);

  return (
    <div ref={desktopRef} className="flex-1 flex flex-col desktop-container">
      {desktopConfig.map((c, index) => (
        <span key={index}>{c.name}</span>
      ))}

      <div id="desktop-selection" className="desktop-selection" />
    </div>
  );
}
