import { Divider, Input } from '@mui/joy';
import { useCallback, useRef } from 'react';
import styled from 'styled-components';

import { type Options } from '../../../context/window-manager';
import { useWindowContext } from '../../../hooks';
import { createLogger } from '../../../utils/logger';
import { ButtonWrapper } from '../../buttons/button-wrapper';
import { ArrowIcon } from '../../icons/arrow-icon';
import { TrafficLightButtonGroup } from '../../traffic-light';
import { DraggableWindowWrapper } from '../common/draggable-wrapper';
import ResizableWrapper from '../common/resize-wrapper';
import { useWindowState } from '../hooks';
import { FileTreeItemWrapper } from './file-tree';
import './style.less';
import { WindowTabs } from './tabs';

type WindowComponentProps = Partial<Options> & {
  id: string;
};

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

const logger = createLogger('ExplorerWindowComponent');

export function ExplorerWindowComponent({
  id,
  title = 'explorer',
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { windowManager } = useWindowContext();

  const windowState = useWindowState(id);

  console.log('windowState', windowState);

  const handleResize = useCallback((width: number, height: number) => {
    logger('handleResize', width, height);
  }, []);

  return (
    <DraggableWindowWrapper
      id={id}
      title={title}
      zIndex={windowState.zIndex}
      size={windowState.size}
      position={windowState.position}
      isMaximized={windowState.isMaximized}
      nodeRef={headerRef}
      cancel=".tabs-container"
      handle=".explorer-window-header"
      className="explorer-window"
    >
      <ResizableWrapper onResize={handleResize} id={id} size={windowState.size}>
        <Container className="flex flex-col w-full h-full">
          <header
            ref={headerRef}
            className="explorer-window-header flex flex-row justify-between items-center w-full"
          >
            <WindowTabs id={id} />
            <TrafficLightButtonGroup windowManager={windowManager} id={id} />
          </header>

          <div className="explorer-window-toolbar w-full">1111</div>

          <div className="address flex flex-row w-full">
            <div className="icon-pack flex flex-row justify-between items-center">
              <ButtonWrapper backgroundColor="#e5f3ff">
                <ArrowIcon type="left" />
              </ButtonWrapper>
              <ButtonWrapper backgroundColor="#e5f3ff">
                <ArrowIcon type="right" />
              </ButtonWrapper>
              <ButtonWrapper backgroundColor="#e5f3ff">
                <ArrowIcon type="down" />
              </ButtonWrapper>
              <ButtonWrapper backgroundColor="#e5f3ff">
                <ArrowIcon type="up" />
              </ButtonWrapper>
            </div>
            <div className="address-path flex-1">
              <Input
                sx={{
                  '--Input-radius': '0px',
                  borderBottom: 'none',
                  '--Input-minHeight': '0px',
                  outline: 'none',
                  '&::before': {
                    display: 'none',
                  },
                }}
                className="path w-full"
              />
            </div>
            <div className="address-search">
              <Input
                sx={{
                  '--Input-radius': '0px',
                  borderBottom: 'none',
                  '--Input-minHeight': '0px',
                  outline: 'none',
                  '&::before': {
                    display: 'none',
                  },
                }}
                className="search w-full"
              />
            </div>
          </div>

          <div className="explorer-window-content flex flex-row flex-1">
            <div className="file-tree-container h-full flex flex-col justify-start items-start">
              <FileTreeItemWrapper>home</FileTreeItemWrapper>
              <Divider />
              <FileTreeItemWrapper>1</FileTreeItemWrapper>
              <FileTreeItemWrapper>1</FileTreeItemWrapper>
              <FileTreeItemWrapper>1</FileTreeItemWrapper>
              <Divider />
              <FileTreeItemWrapper>1</FileTreeItemWrapper>
            </div>
            <div className="content-container flex-1">{content}</div>
            <div className="preview-container"></div>
          </div>
          <div className="explorer-window-footer w-full flex flex-row justify-between items-center"></div>
        </Container>
      </ResizableWrapper>
    </DraggableWindowWrapper>
  );
}
