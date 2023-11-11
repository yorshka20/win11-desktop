import { useEffect, useRef, useState } from 'react';

import { SystemContextMenu } from './components/context-menu';
import { DesktopIconWrapper } from './components/desktop-icon';
import { DesktopSelectionContainer } from './components/desktop-selection';
import { IconMap, loadIcons } from './components/icons/internal-icons';
import { WindowComponentContainer } from './components/windows';
import { desktopIconConfig } from './configs/desktop-config';
import { useContextState, useWindowContext } from './hooks';

export interface DesktopItem {
  name: string;
  icon: string;
}

interface DesktopContainerProps {
  desktopConfig: DesktopItem[];
}

export function DesktopContainer({ desktopConfig }: DesktopContainerProps) {
  const desktopRef = useRef<HTMLDivElement>(null);

  // todo
  desktopConfig;

  const context = useWindowContext();

  useEffect(() => {
    const container = desktopRef.current;
    if (container) {
      context.desktopContainer = container;
    }
  }, [context, desktopRef]);

  return (
    <div
      ref={desktopRef}
      id="desktop"
      className="w-full h-full flex flex-1 desktop-container"
    >
      {/* desktop icons */}
      <DesktopIconSet />

      {/* test icon block */}
      <IconBlock />

      {/* desktop selections area */}
      <DesktopSelectionContainer selectionRef={desktopRef} />

      {/* desktop context menu  */}
      <SystemContextMenu />

      {/* separate window mount portal  */}
      <WindowComponentContainer />
    </div>
  );
}

function DesktopIconSet() {
  const selectedDesktopIcons = useContextState('selectedDesktopIcons');

  return desktopIconConfig.map(({ icon: Icon, grid, name, id }, index) => (
    <DesktopIconWrapper
      id={id}
      selected={selectedDesktopIcons.includes(id)}
      grid={grid}
      name={name}
      shadowText
      key={index}
      icon={<Icon className={'icon'} />}
    />
  ));
}

function IconBlock() {
  const [icons, setIcons] = useState(IconMap);
  const selectedDesktopIcons = useContextState('selectedDesktopIcons');

  useEffect(() => {
    loadIcons().then((res) => {
      console.log('do icons load?', res);
      setIcons({ ...res });
    });
  }, []);

  return Object.keys(icons)
    .map((iconType, i) =>
      Object.keys(icons[iconType]).map((name, j) => {
        const Icon = icons[iconType][name];
        const grid = [i + Math.round(j / 5), j % 5] as [number, number];
        return (
          <DesktopIconWrapper
            selected={selectedDesktopIcons.includes(`${iconType}-${name}`)}
            grid={grid}
            name={name}
            id={`${iconType}-${name}`}
            shadowText
            key={`${i}${j}`}
            icon={<Icon size={70} />}
          />
        );
      }),
    )
    .flat();
}
