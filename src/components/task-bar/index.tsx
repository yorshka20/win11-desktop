import { SearchOutlined } from '@mui/icons-material';
import React, { useCallback } from 'react';

import { Options, type WindowHandler } from '../../context/window-manager';
import { useWindowContext } from '../../hooks';
import { ExplorerIcon } from '../icons/internal-icons';
import { WinIcon } from '../icons/win-icon';
import { TaskBarButton } from '../task-bar-icon';
import { TimeBlock } from '../time';
import { windowOpener } from '../windows/create-window';
import './style.less';

interface Props {
  buttons: TaskbarConfigItem[];
}

export interface TaskbarConfigItem {
  name: string;
  icon: string | React.FC;
}

export function TaskBar({ buttons }: Props) {
  const { dispatcher, windowManager, event$ } = useWindowContext();

  const handleClickStart = useCallback(() => {
    dispatcher('display-start-menu');
  }, [dispatcher]);

  const handleSetting = () => {
    const id = `setting-window-${Math.random().toString(36)}`;
    const options: Options = {
      id,
      size: [1080, 600],
      position: [200, 100],
      title: id,
      reuse: false,
      zIndex: 10,
      content: id,
    };
    const window = windowOpener('Setting', options);

    const handler: WindowHandler = {
      close() {
        event$.next({
          name: 'close-window',
          id,
        });
      },
      move(pos) {
        console.log('move window', pos);
      },
      maximize() {
        event$.next({
          name: 'maximize-window',
          id,
        });
      },
      minimize() {
        event$.next({
          name: 'minimize-window',
          id,
        });
      },
      window,
      data: options,
    };

    console.log('windowOpener', window, handler);

    // 1. add window
    windowManager.addWindow(id, handler);

    // 2. open window
    event$.next({
      name: 'open-window',
      id,
    });
  };

  const handleSearch = useCallback(() => {
    const id = `searchWindow-${Math.random().toString(36)}`;
    const options: Options = {
      id,
      size: [1080, 600],
      position: [200, 100],
      title: id,
      reuse: false,
      zIndex: 10,
      content: id,
    };
    const window = windowOpener('Explorer', options);

    const handler: WindowHandler = {
      close() {
        event$.next({
          name: 'close-window',
          id,
        });
      },
      move(pos) {
        console.log('move window', pos);
      },
      maximize() {
        event$.next({
          name: 'maximize-window',
          id,
        });
      },
      minimize() {
        event$.next({
          name: 'minimize-window',
          id,
        });
      },
      window,
      data: options,
    };

    console.log('windowOpener', window, handler);

    // 1. add window
    windowManager.addWindow(id, handler);

    // 2. open window
    event$.next({
      name: 'open-window',
      id,
    });
  }, [windowManager, event$]);

  return (
    <div className="taskbar-container w-full">
      <div className="flex flex-row justify-between items-center w-full h-full taskbar">
        <div className="taskbar-left">
          <SearchOutlined onClick={handleSetting} />
        </div>

        <div className="flex flex-row justify-start item-center">
          <TaskBarButton
            onClick={handleClickStart}
            name="start"
            id={'win-button'}
            icon={<WinIcon />}
          />
          <TaskBarButton
            onClick={handleSearch}
            name="search"
            icon={<ExplorerIcon />}
          />

          {buttons.map(({ name, icon: Icon }) => (
            <TaskBarButton name={name} icon={<Icon />} key={name} />
          ))}
        </div>

        <div className="taskbar-right flex flex-row justify-end items-center">
          <TaskBarButton name="search" icon={<SearchOutlined />} />

          <TimeBlock />

          <div className="back-to-desktop" />
        </div>
      </div>
      <div className="taskbar-float-menu">1</div>
    </div>
  );
}
