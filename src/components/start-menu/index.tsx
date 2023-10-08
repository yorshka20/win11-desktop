import {
  FileCopy,
  PowerOffOutlined,
  SearchOutlined,
  Settings,
} from '@mui/icons-material';
import { useRef } from 'react';

import { desktopIconConfig } from '../../configs/desktop-config';
import { store } from '../../context/store';
import { useClickOutside, useContextState } from '../../hooks';
import { ButtonWrapper } from '../buttons/button-wrapper';
import { DesktopIconWrapper } from '../desktop-icon';
import './style.less';

export function StartMenu() {
  const show = useContextState('showStartMenu');

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside([ref.current, '#win-button'], () => {
    store.updateState('showStartMenu', false);
  });

  return (
    <div
      style={{ visibility: show ? 'visible' : 'hidden' }}
      ref={ref}
      className="flex flex-col justify-between items-start  start-menu-container"
    >
      <div className="start-menu-content w-full flex flex-col flex-1">
        <div className="flex justify-start items-center w-full input-wrapper">
          <SearchOutlined />
          <span>Search for applications, settings and documents</span>
        </div>
        <div className="pin-header w-full flex justify-between items-center">
          <span>Pinned Apps</span>
          <span className="all-apps">All Apps {'>'}</span>
        </div>
        <div className="pin-block draggable-area w-full flex flex-row flex-wrap justify-start items-center">
          {desktopIconConfig.map(({ icon: Icon, name, id, grid }, index) => (
            <DesktopIconWrapper
              key={index}
              icon={<Icon className={'icon'} />}
              name={name}
              id={id}
              grid={grid}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center start-menu-footer">
        <ButtonWrapper className="profile" title="profile">
          <div className="profile-content flex flex-row justify-start items-center">
            <Settings />
            <span className="name text-center">Yorshka</span>
          </div>
        </ButtonWrapper>
        <div className="flex flex-row justify-center items-center footer-icons">
          <ButtonWrapper title="explorer">
            <FileCopy className="footer-icon" />
          </ButtonWrapper>
          <ButtonWrapper title="setting">
            <Settings className="footer-icon" />
          </ButtonWrapper>
          <ButtonWrapper title="power">
            <PowerOffOutlined className="footer-icon" />
          </ButtonWrapper>
        </div>
      </div>
    </div>
  );
}
