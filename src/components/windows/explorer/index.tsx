import {
  CloseOutlined,
  CropSquareOutlined,
  Minimize,
} from '@mui/icons-material';
import { Divider, Input } from '@mui/joy';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Draggable, { type DraggableEventHandler } from 'react-draggable';

import type { Options } from '../../../context/window-manager';
import { useEventListener, useWindowContext } from '../../../hooks';
import type { WindowType } from '../../../types';
import { Size } from '../../../types';
import { ButtonWrapper } from '../../buttons/button-wrapper';
import { ArrowIcon } from '../../icons/arrow-icon';
import './style.less';

interface WindowComponentProps extends Options {}

function ExplorerWindowComponent({
  title,
  id,
  position: pos,
  zIndex,
  size: si,
  content = '',
}: WindowComponentProps) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { desktopContainer, windowManager } = useWindowContext();

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: pos[0],
    y: pos[1],
  });
  const [size, setSize] = useState<Size>(si);
  const [className, setClassName] = useState<string>('');

  function getWindowHandler() {
    return windowManager.getWindow(id);
  }

  useEffect(() => {
    const sub = windowManager.subscribeWindowState(id, 'isMaximized', (v) => {
      console.log('state change', v);
      setClassName(v ? 'fullscreen-state' : '');
    });
    return () => {
      sub.unsubscribe();
    };
  }, [windowManager, id]);

  // const handleStart = (e) => {
  //   // console.log('start', e);
  // };
  const handleDrag: DraggableEventHandler = (e, data) => {
    // console.log('drag', e, data);
    const isMaximized = windowManager.getWindowStateByKey(id, 'isMaximized');
    if (!isMaximized) return;
    if (data.y > 50) {
      windowManager.updateWindowState(id, 'isMaximized', false);
      setSize([600, 400]);

      const { width } = desktopContainer.getBoundingClientRect();
      const { clientX } = e as MouseEvent;
      setPosition({
        x: Math.round(clientX - (clientX / width) * 600),
        y: data.y,
      });
    }
  };

  const handleStop: DraggableEventHandler = (_, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  function handleFocusWindow() {
    windowManager.updateWindowState(id, 'isActive', true);
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

  useEventListener(id, [
    {
      event: 'maximize-window',
      handler() {
        const { width, height } = desktopContainer.getBoundingClientRect();
        setSize([width, height]);
        setPosition({ x: 0, y: 0 });
      },
    },
    {
      event: 'minimize-window',
      handler() {
        setPosition({ x: 9999, y: 9999 });
      },
    },
  ]);

  return (
    <Draggable
      axis="both"
      handle=".window-header"
      defaultPosition={{ x: 0, y: 0 }}
      position={position}
      grid={[1, 1]}
      scale={1}
      // onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div
        style={{
          width: size[0],
          height: size[1],
          zIndex,
        }}
        onClick={handleFocusWindow}
        title={title}
        className={classNames(
          'flex flex-col window-component-container',
          className,
        )}
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
              <CropSquareOutlined
                onClick={handleMaximize}
                className="icon max"
              />
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
      </div>
    </Draggable>
  );
}

function FileTreeItemWrapper({ children }) {
  const [focused, setFocused] = useState(false);

  function handleClick() {
    setFocused((f) => !f);
  }

  return (
    <p
      onClick={handleClick}
      className={`file-tree-item-wrapper w-full ${focused ? 'focused' : ''}`}
    >
      {children}
    </p>
  );
}

export function createExplorerWindow(windowType: WindowType, options: Options) {
  console.log('options in create window', windowType, options);

  return <ExplorerWindowComponent {...options} />;
}
