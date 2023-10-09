import { useRef } from 'react';
import { styled } from 'styled-components';

import { type Options } from '../../../context/window-manager';
import { useWindowContext } from '../../../hooks';
import type { WindowType } from '../../../types';
import { TrafficLightButtonGroup } from '../../traffic-light';
import { DraggableWindowWrapper } from '../window-component';

interface WindowComponentProps extends Options {}

const Container = styled.div`
  background-color: white;
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
      size={size}
      position={position}
      // nodeRef={() => headerRef}
      handle=".window-header"
    >
      <Container className="flex flex-col w-full h-full">
        <header
          ref={headerRef}
          className="window-header flex flex-row justify-between items-center w-full"
        >
          header
          <TrafficLightButtonGroup windowManager={windowManager} id={id} />
        </header>
        <div className="content flex-1">{content}</div>
        <div className="footer w-full flex flex-row justify-between items-center"></div>
      </Container>
    </DraggableWindowWrapper>
  );
}

export function createSettingWindow(windowType: WindowType, options: Options) {
  console.log('options in create window', windowType, options);

  return <SettingWindowComponent {...options} />;
}
