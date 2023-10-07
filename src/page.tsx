import React, { useEffect, useRef } from 'react';

import {
  ContextMenu,
  type ContextMenuItemConfig,
  buildFromConfig,
  useContextMenu,
} from './components/context-menu';
import { WindowComponentContainer } from './components/windows';
import { contextMenuConfig } from './configs/desktop-config';
import {
  useContextState,
  useDesktopSelection,
  useWindowContext,
} from './hooks';

export interface DesktopItem {
  name: string;
  icon: string;
}

interface DesktopContainerProps {
  desktopConfig: DesktopItem[];
}

export function DesktopContainer({ desktopConfig }: DesktopContainerProps) {
  const desktopRef = useRef<HTMLDivElement>(null);

  const context = useWindowContext();

  const selectionArea = useDesktopSelection(desktopRef);

  const position = useContextMenu();

  const showContextMenu = useContextState('showContextMenu');

  useEffect(() => {
    // console.log('selectionArea', selectionArea);
  }, [selectionArea]);

  useEffect(() => {
    const container = desktopRef.current;
    if (container) {
      context.desktopContainer = container;
    }
  }, [context]);

  return (
    <div
      ref={desktopRef}
      id="desktop"
      className="flex-1 flex flex-col desktop-container"
    >
      {/* desktop icons */}
      {desktopConfig.map((c, index) => (
        <span key={index}>{c.name}</span>
      ))}

      {/* desktop selections area */}
      <div id="desktop-selection" className="desktop-selection" />

      {/* desktop context menu  */}
      <ContextMenu position={position} show={showContextMenu}>
        {menuContent(contextMenuConfig as ContextMenuItemConfig[])}
      </ContextMenu>

      {/* separate window mount portal  */}
      <WindowComponentContainer />
    </div>
  );
}

function menuContent(configs: ContextMenuItemConfig[]): React.JSX.Element {
  return <>{configs.map((item) => buildFromConfig(item))}</>;
}
