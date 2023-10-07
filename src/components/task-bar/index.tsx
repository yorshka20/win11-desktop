import { SearchOutlined } from '@mui/icons-material';
import React, { useCallback } from 'react';

import { useWindowContext } from '../../hooks';
import { TaskBarButton } from '../task-bar-icon';
import { TimeBlock } from '../time';
import { windowOpener } from '../windows/create-window';
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
  const { dispatcher } = useWindowContext();

  const handleClickStart = useCallback(() => {
    dispatcher('trigger-start-menu');
  }, [dispatcher]);

  const handleSearch = useCallback(() => {
    const genNumber = () => Math.random() * 1000;
    const handler = windowOpener('Explorer', {
      size: [genNumber(), genNumber()],
      position: [genNumber(), genNumber()],
      title: 'search window',
      reuse: false,
      zIndex: genNumber(),
      content: Math.round(Math.random() * 100),
    } as any);

    console.log('handler', handler);
  }, []);

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
