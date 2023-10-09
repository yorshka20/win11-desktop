import React, { useEffect, useRef, useState } from 'react';

import {
  ContextMenu,
  type ContextMenuItemConfig,
  buildFromConfig,
  useContextMenu,
} from './components/context-menu';
import { DesktopIconWrapper } from './components/desktop-icon';
import { IconMap, loadIcons } from './components/icons/internal-icons';
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

  const [icons, setIcons] = useState(IconMap);

  const context = useWindowContext();

  const selectionArea = useDesktopSelection(desktopRef);

  const position = useContextMenu();

  const showContextMenu = useContextState('showContextMenu');

  useEffect(() => {
    // console.log('selectionArea', selectionArea);
  }, [selectionArea]);

  useEffect(() => {
    loadIcons().then((res) => {
      console.log('do icons load?', res);
      setIcons({ ...res });
    });
  }, []);

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
      className="flex-1 h-full flex flex-col flex-wrap justify-start items-start desktop-container"
    >
      {/* desktop icons */}
      {desktopIconConfig.map(({ icon: Icon, grid, name, id }, index) => (
        <DesktopIconWrapper
          grided
          id={id}
          grid={grid}
          name={name}
          shadowText
          key={index}
          icon={<Icon className={'icon'} />}
        />
      ))}

      {Object.keys(icons)
        .map((iconType, i) =>
          Object.keys(icons[iconType]).map((name, j) => {
            const Icon = icons[iconType][name];

            return (
              <DesktopIconWrapper
                grided
                grid={[
                  Math.round(Math.random() * 8),
                  Math.round(Math.random() * 2),
                ]}
                name={name}
                id={`${iconType}-${name}`}
                shadowText
                key={`${i}${j}`}
                icon={<Icon size={70} />}
              />
            );
          }),
        )
        .flat()}

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
