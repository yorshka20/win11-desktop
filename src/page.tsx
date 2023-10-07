import React, { useEffect, useRef } from 'react';

import {
  ContextMenu,
  type ContextMenuItemConfig,
  buildFromConfig,
  useContextMenu,
} from './components/context-menu';
import { contextMenuConfig } from './configs/desktop-config';
import { useContextState, useDesktopSelection } from './hooks';

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

  const position = useContextMenu();

  const showContextMenu = useContextState('showContextMenu');

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
      <ContextMenu position={position} show={showContextMenu}>
        {menuContent(contextMenuConfig as ContextMenuItemConfig[])}
      </ContextMenu>
    </div>
  );
}

function menuContent(configs: ContextMenuItemConfig[]): React.JSX.Element {
  return <>{configs.map((item) => buildFromConfig(item))}</>;
}
