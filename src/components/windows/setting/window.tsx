import { Input } from '@mui/joy';
import { useRef } from 'react';
import { styled } from 'styled-components';

import avatarImg from '../../../assets/avatar.jpg';
import { type Options } from '../../../context/window-manager';
import { useWindowContext } from '../../../hooks';
import { TrafficLightButtonGroup } from '../../traffic-light';
import { DraggableWindowWrapper } from '../common/draggable-wrapper';
import ResizableWrapper from '../common/resize-wrapper';
import { useWindowState } from '../hooks';
import { MenuBlock } from './menus';
import './style.less';

type WindowComponentProps = Partial<Options> & {
  id: string;
};

const Container = styled.div`
  background-color: #f0f3f9;

  border-radius: 6px;

  .setting-window-header {
    height: 40px;
  }
`;

const ProfileBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  border-radius: 6px;

  padding: 10px;

  &:hover {
    background-color: #e7ebf0;
  }

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    font-size: 12px;
  }
`;

export function SettingWindowComponent({
  id,
  title = 'setting',
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { windowManager } = useWindowContext();

  windowManager;

  const windowState = useWindowState(id);

  console.log('windowState', windowState);

  const handleResize = (width: number, height: number) => {
    console.log('width, height', width, height);
  };

  return (
    <DraggableWindowWrapper
      id={id}
      title={title}
      zIndex={windowState.zIndex}
      size={windowState.size}
      position={windowState.position}
      isMaximized={windowState.isMaximized}
      nodeRef={() => headerRef}
      handle=".setting-window-header"
      className="setting-window-component"
    >
      <ResizableWrapper onResize={handleResize} size={windowState.size} id={id}>
        <Container className="flex flex-col w-full h-full">
          <header
            ref={headerRef}
            className="setting-window-header flex flex-row justify-end items-center w-full"
          >
            <TrafficLightButtonGroup windowManager={windowManager} id={id} />
          </header>

          <div className="flex flex-1 flex-row w-full h-full justify-center items-center content-container">
            <div className="flex flex-col justify-start items-start h-full menus">
              {/* user profile  */}
              <ProfileBlock className="profile-block w-full">
                <img src={avatarImg} alt="profile" className="round" />
                <div className="content">
                  <span>Yorshka</span>
                  <span>mail@yors.hk</span>
                </div>
              </ProfileBlock>

              {/* search input  */}
              <Input
                className="search-input w-full"
                sx={{
                  '--Input-minHeight': '30px',
                }}
              />

              {/* menu tree */}
              <MenuBlock />
            </div>
            <div className="content w-full h-full flex-1">{content}</div>
          </div>
        </Container>
      </ResizableWrapper>
    </DraggableWindowWrapper>
  );
}
