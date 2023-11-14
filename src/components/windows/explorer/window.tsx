import { Divider, Input } from '@mui/joy';
import { useCallback, useRef } from 'react';

import { type Options } from '../../../context/window-manager';
import { useWindowContext } from '../../../hooks';
import { createLogger } from '../../../utils/logger';
import { ButtonWrapper } from '../../buttons/button-wrapper';
import { ArrowIcon } from '../../icons/arrow-icon';
import { TrafficLightButtonGroup } from '../../traffic-light';
import { DraggableWindowWrapper } from '../common/draggable-wrapper';
import { ResizableWrapper } from '../common/resize-wrapper';
import { useWindowState } from '../hooks';
import { FileTreeItemWrapper } from './file-tree';
import { WindowTabs } from './tabs';

type WindowComponentProps = Partial<Options> & {
  id: string;
};

const logger = createLogger('ExplorerWindowComponent');

export function ExplorerWindowComponent({
  id,
  title = 'explorer',
  content = '',
}: WindowComponentProps) {
  const { windowManager } = useWindowContext();

  const windowState = useWindowState(id);

  // draggable ref
  const draggableRef = useRef<HTMLElement>(null);

  console.log('windowState Explorer', windowState);

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
      cancel=".tabs-container"
      className="explorer-window"
      ref={draggableRef} // this ref is forwarded by `React.forwardRef`. it's not in props
    >
      <ResizableWrapper
        className="explorer-resize-wrapper"
        onResize={handleResize}
        id={id}
        size={windowState.size}
      >
        <header
          ref={draggableRef}
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
      </ResizableWrapper>
    </DraggableWindowWrapper>
  );
}
