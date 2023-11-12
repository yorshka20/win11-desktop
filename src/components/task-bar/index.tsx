import { SearchOutlined } from '@mui/icons-material';
import { useCallback } from 'react';

import { useContextState, useWindowContext } from '../../hooks';
import { ExplorerIcon } from '../icons/internal-icons';
import { WinIcon } from '../icons/win-icon';
import { TaskBarButton } from '../task-bar-icon';
import { TimeBlock } from '../time';
import { windowOpener } from '../windows/create-window';
import { TaskBarFloatMenu } from './float-menu';
import './style.less';

export function TaskBar() {
  const context = useWindowContext();
  const { dispatcher } = context;

  const taskbarIcons = useContextState('taskBarIcons');

  const handleClickStart = useCallback(() => {
    dispatcher('display-start-menu');
  }, [dispatcher]);

  const handleClickIcon = useCallback(
    (name: string) => () => {
      dispatcher('click-taskbar-icon', {
        name,
        type: 'window',
      });
    },
    [dispatcher],
  );

  const handleSetting = () => {
    windowOpener('Setting', context);
  };

  const handleSearch = useCallback(() => {
    windowOpener('Explorer', context);
  }, [context]);

  const handleEnter = useCallback(() => {
    dispatcher('hover-taskbar-preview', true);
  }, [dispatcher]);

  const handleLeave = useCallback(() => {
    dispatcher('hover-taskbar-preview', false);
  }, [dispatcher]);

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
            name="Explorer"
            id="Explorer"
            icon={<ExplorerIcon />}
          />

          {taskbarIcons.map(({ name, icon: Icon }) => (
            <TaskBarButton
              onClick={handleClickIcon(name)}
              name={name}
              id={name}
              icon={<Icon />}
            />
          ))}
        </div>

        <div className="taskbar-right flex flex-row justify-end items-center">
          <TimeBlock />
          <div className="back-to-desktop" />
        </div>
      </div>

      {/* float menu for cascade window preview */}
      <TaskBarFloatMenu onEnter={handleEnter} onLeave={handleLeave} />
    </div>
  );
}
