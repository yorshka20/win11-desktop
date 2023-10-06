import { SearchOutlined } from '@mui/icons-material';
import React, { useCallback } from 'react';

import { useWindowContext } from '../../hooks';
import { TaskBarButton } from '../task-bar-icon';
import { TimeBlock } from '../time';
import './style.less';
import { WinIcon } from './win-icon';

interface Props {
  buttons: TaskbarConfigItem[];
}

interface TaskbarConfigItem {
  name: string;
  icon: string | React.FC;
}

export function TaskBar({ buttons }: Props) {
  const { store } = useWindowContext();

  const handleClickStart = useCallback(() => {
    const show = store.getState()['showStartMenu'];
    store.updateState('showStartMenu', !show);
  }, [store]);

  return (
    <div className="taskbar-container w-full">
      <div className="flex flex-row justify-between items-center w-full h-full taskbar">
        <div className="taskbar-left">
          <SearchOutlined />
        </div>

        <div className="flex flex-row justify-start item-center">
          <TaskBarButton
            onclick={handleClickStart}
            name="start"
            icon={WinIcon}
          />
          <TaskBarButton name="search" icon={SearchOutlined} />

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
