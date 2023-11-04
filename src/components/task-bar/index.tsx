import { SearchOutlined, Settings } from '@mui/icons-material';
import React, { useCallback } from 'react';

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
  const context = useWindowContext();
  const { dispatcher } = context;

  const handleClickStart = useCallback(() => {
    dispatcher('display-start-menu');
  }, [dispatcher]);

  const handleSetting = () => {
    windowOpener('Setting', context);
  };

  const handleSearch = useCallback(() => {
    windowOpener('Explorer', context);
  }, [context]);

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
            id="search"
            icon={<ExplorerIcon />}
          />
          <TaskBarButton
            onClick={handleSetting}
            name="setting"
            id="setting"
            icon={<Settings />}
          />

          {buttons.map(({ name, icon: Icon }) => (
            <TaskBarButton id={name} name={name} icon={<Icon />} key={name} />
          ))}
        </div>

        <div className="taskbar-right flex flex-row justify-end items-center">
          <TaskBarButton id="search" name="search" icon={<SearchOutlined />} />

          <TimeBlock />

          <div className="back-to-desktop" />
        </div>
      </div>
      <div className="taskbar-float-menu">1</div>
    </div>
  );
}
