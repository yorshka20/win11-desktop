import React, { useEffect, useRef } from 'react';

import {
  ContextMenu,
  type ContextMenuItemConfig,
  buildFromConfig,
  useContextMenu,
} from './components/context-menu';
import { DesktopIconWrapper } from './components/desktop-icon';
import { WindowComponentContainer } from './components/windows';
import { contextMenuConfig, desktopIconConfig } from './configs/desktop-config';
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

  desktopConfig;

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
      className="flex-1 flex flex-col flex-wrap justify-start items-start desktop-container"
    >
      {/* desktop icons */}
      {desktopIconConfig.map((c, index) => (
        <DesktopIconWrapper
          key={index}
          grid={c.grid}
          id={c.id}
          name={c.name}
          icon={c.icon}
        />
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
