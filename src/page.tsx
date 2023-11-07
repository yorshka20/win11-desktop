import { useEffect, useRef, useState } from 'react';
import Draggable, { type DraggableEventHandler } from 'react-draggable';

import { SystemContextMenu } from './components/context-menu';
import { DesktopIconWrapper } from './components/desktop-icon';
import { DesktopSelectionContainer } from './components/desktop-selection';
import { IconMap, loadIcons } from './components/icons/internal-icons';
import { WindowComponentContainer } from './components/windows';
import { desktopIconConfig } from './configs/desktop-config';
import { useWindowContext } from './hooks';

export interface DesktopItem {
  name: string;
  icon: string;
}

interface DesktopContainerProps {
  desktopConfig: DesktopItem[];
}

export function DesktopContainer({ desktopConfig }: DesktopContainerProps) {
  const desktopRef = useRef<HTMLDivElement>(null);

  const ref = useRef(null);

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

      <Draggable
        axis="both"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[1, 1]}
        scale={1}
        // nodeRef={ref}
        handle=".header"
      >
        <div style={{ width: '300px', height: 300, background: 'white' }}>
          <header ref={ref} className="header">
            header
          </header>
          111
        </div>
      </Draggable>

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

function IconBlock() {
  const [icons, setIcons] = useState(IconMap);

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
    .flat();
}
