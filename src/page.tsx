import React from 'react';

import { WindowContextProvider } from './context/context-provider';
import { useContextState } from './hooks';

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
  console.log('config', desktopConfig);
  const time = useContextState('time');
  console.log('time', time);

  return (
    <div className="flex-1 flex flex-col ">
      {desktopConfig.map((c, index) => (
        <span key={index}>{c.name}</span>
      ))}
    </div>
  );
}
