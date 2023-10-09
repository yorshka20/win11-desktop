import {
  CloseOutlined,
  CropSquareOutlined,
  Minimize,
} from '@mui/icons-material';
import { Divider, Input } from '@mui/joy';
import { useRef } from 'react';

import { type Options } from '../../../context/window-manager';
import { useWindowContext } from '../../../hooks';
import { ButtonWrapper } from '../../buttons/button-wrapper';
import { ArrowIcon } from '../../icons/arrow-icon';
import { DraggableWindowWrapper } from '../window-component';
import { FileTreeItemWrapper } from './file-tree';
import './style.less';

interface WindowComponentProps extends Options {}

export function ExplorerWindowComponent({
  title,
  id,
  position,
  zIndex,
  size,
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { windowManager } = useWindowContext();

  function getWindowHandler() {
    return windowManager.getWindow(id);
  }

  function handleMinimize() {
    const handler = getWindowHandler();
    handler.minimize();
  }
  function handleMaximize() {
    const handler = getWindowHandler();
    handler.maximize();
  }
  function handleClose() {
    const handler = getWindowHandler();
    handler.close();
  }

  return (
    <DraggableWindowWrapper
      id={id}
      title={title}
      zIndex={zIndex}
      size={size}
      position={position}
      nodeRef={() => headerRef}
    >
      <header
        ref={headerRef}
        className="window-header flex flex-row justify-between items-center w-full"
      >
        <div className="tabs"></div>
        <div className="buttons self-start flex flex-row justify-between items-start">
          <ButtonWrapper className="rect-border" height={20}>
            <Minimize onClick={handleMinimize} className="icon min" />
          </ButtonWrapper>
          <ButtonWrapper className="rect-border" height={20}>
            <CropSquareOutlined onClick={handleMaximize} className="icon max" />
          </ButtonWrapper>
          <ButtonWrapper
            className="close-icon"
            height={20}
            backgroundColor="red"
          >
            <CloseOutlined onClick={handleClose} className="icon close" />
          </ButtonWrapper>
        </div>
      </header>
      <div className="window-toolbar w-full">1111</div>
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
      <div className="window-content flex flex-row flex-1">
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
      <div className="footer w-full flex flex-row justify-between items-center"></div>
    </DraggableWindowWrapper>
  );
}
