import { SearchOutlined } from '@mui/icons-material';
import React, { useCallback } from 'react';

import { store } from '../../context/store';
import { useWindowContext } from '../../hooks';
import { TaskBarButton } from '../task-bar-icon';
import { TimeBlock } from '../time';
import { windowOpener } from '../windows/create-window';
import { type WindowHandler } from '../windows/interface';
import './style.less';
import { WinIcon } from './win-icon';

interface Props {
  buttons: TaskbarConfigItem[];
}

export interface TaskbarConfigItem {
  name: string;
  icon: string | React.FC;
}

export function TaskBar({ buttons }: Props) {
  const { dispatcher, windowManager } = useWindowContext();

  const handleClickStart = useCallback(() => {
    dispatcher('trigger-start-menu');
  }, [dispatcher]);

  const handleSearch = useCallback(() => {
    const id = 'searchWindow';
    const window = windowOpener('Explorer', {
      id,
      size: [600, 400],
      position: [200, 100],
      title: 'search window',
      reuse: false,
      zIndex: 10,
      content: 'window content',
    });

    const handler: WindowHandler = {
      close() {
        store.getEventPipe().next({
          name: 'close-window',
          value: {
            id,
          },
        });
      },
      move(pos) {
        console.log('move window', pos);
      },
      maximize() {
        store.getEventPipe().next({
          name: 'maximize-window',
          value: {
            id,
          },
        });
      },
      minimize() {
        store.getEventPipe().next({
          name: 'minimize-window',
          value: {
            id,
          },
        });
      },
      window,
    };

    console.log('windowOpener', window, handler);

    windowManager.addWindow('searchWindow', handler);

    store.dispatchEvent({
      name: 'open-window',
      value: {
        id: 'searchWindow',
      },
    });

    console.log('handler', handler);
  }, [windowManager]);

  return (
    <div className="taskbar-container w-full">
      <div className="flex flex-row justify-between items-center w-full h-full taskbar">
        <div className="taskbar-left">
          <SearchOutlined />
        </div>

        <div className="flex flex-row justify-start item-center">
          <TaskBarButton
            onClick={handleClickStart}
            name="start"
            icon={WinIcon}
          />
          <TaskBarButton
            onClick={handleSearch}
            name="search"
            icon={SearchOutlined}
          />

          {buttons.map((btn) => (
            <TaskBarButton name={btn.name} icon={btn.icon} key={btn.name} />
          ))}
        </div>

        <div className="taskbar-right flex flex-row justify-end items-center">
          <TaskBarButton name="search" icon={SearchOutlined} />

          <TimeBlock />

          <div className="back-to-desktop" />
        </div>
      </div>
      <div className="taskbar-float-menu">1</div>
    </div>
  );
}
