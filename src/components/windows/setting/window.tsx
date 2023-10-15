import { Input } from '@mui/joy';
import { useRef } from 'react';
import { styled } from 'styled-components';

import { type Options } from '../../../context/window-manager';
import { useWindowContext } from '../../../hooks';
import type { WindowType } from '../../../types';
import { TrafficLightButtonGroup } from '../../traffic-light';
import ResizableWrapper from '../resize-wrapper';
import { DraggableWindowWrapper } from '../window-component';
import './style.less';

interface WindowComponentProps extends Options {}

const Container = styled.div`
  background-color: #f0f3f9;

  border-radius: 6px;

  .setting-window-header {
    height: 40px;
  }

  .profile-block {
    border: 1px solid red;
  }
`;

export function SettingWindowComponent({
  title,
  id,
  position,
  zIndex,
  size,
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { windowManager } = useWindowContext();
  windowManager;

  return (
    <DraggableWindowWrapper
      id={id}
      title={title}
      zIndex={zIndex}
      position={position}
      // nodeRef={() => headerRef}
      handle=".setting-window-header"
      className="setting-window-component"
    >
      <ResizableWrapper
        onResize={(width, height) => {
          windowManager.resizeWindow(id, [width, height]);
        }}
        size={size}
        id={id}
      >
        <Container className="flex flex-col w-full h-full">
          <header
            ref={headerRef}
            className="setting-window-header flex flex-row justify-end items-center w-full"
          >
            <TrafficLightButtonGroup windowManager={windowManager} id={id} />
          </header>
          <div className="flex flex-1 flex-row w-full h-full justify-center items-center content-container">
            <div className="flex flex-col justify-start items-start h-full menus">
              <div className="flex flex-row justify-start items-center profile-block">
                profile 1312312
              </div>
              <Input />
              <p>1</p>
              <p>1</p>
              <p>1</p>
              <p>1</p>
              <p>1</p>
              <p>1</p>
            </div>
            <div className="content w-full h-full flex-1">{content}</div>
          </div>
        </Container>
      </ResizableWrapper>
    </DraggableWindowWrapper>
  );
}

export function createSettingWindow(windowType: WindowType, options: Options) {
  console.log('options in create window', windowType, options);

  return <SettingWindowComponent {...options} />;
}
