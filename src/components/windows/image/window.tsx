import { useRef } from 'react';
import { styled } from 'styled-components';

import avatarImg from '../../../assets/avatar.jpg';
import { type Options } from '../../../context/window-manager';
import { useWindowContext } from '../../../hooks';
import { TrafficLightButtonGroup } from '../../traffic-light';
import { DraggableWindowWrapper } from '../common/draggable-wrapper';
import { ResizableWrapper } from '../common/resize-wrapper';
import { useWindowState } from '../hooks';

type WindowComponentProps = Partial<Options> & {
  id: string;
};

const Container = styled.div`
  position: relative;
  background-color: #f0f3f9;

  border-radius: 6px;
  overflow: hidden;
  .setting-window-header {
    height: 40px;
  }
`;

export function ImageWindowComponent({
  id,
  title = 'image',
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { windowManager } = useWindowContext();

  windowManager;
  content;

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
      ref={headerRef}
      cancel=".tabs-container"
      className="image-window-component"
    >
      <ResizableWrapper onResize={handleResize} size={windowState.size} id={id}>
        <Container className="flex flex-col w-full h-full">
          <header
            ref={headerRef}
            className="setting-window-header flex flex-row justify-end items-center w-full"
          >
            <TrafficLightButtonGroup windowManager={windowManager} id={id} />
          </header>

          <div className="flex flex-row w-full h-full justify-center items-center content-container">
            <img className="h-full" src={avatarImg} />
          </div>
        </Container>
      </ResizableWrapper>
    </DraggableWindowWrapper>
  );
}
