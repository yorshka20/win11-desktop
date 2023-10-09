import {
  CloseOutlined,
  CropSquareOutlined,
  Minimize,
} from '@mui/icons-material';
import React from 'react';
import { styled } from 'styled-components';

import { type WindowManager } from '../../context/window-manager';
import { ButtonWrapper } from '../buttons/button-wrapper';

interface Props {
  windowManager: WindowManager;
  id: string;
}

const Container = styled.div`
  width: 120px;

  .rect-border {
    border-radius: 0;
  }

  .close-icon {
    border-radius: 0;
    border-top-right-radius: 6px;
  }

  .icon {
    margin-right: 4px;
    width: 15px;
    height: 15px;
  }
`;

function Component({ windowManager, id }: Props) {
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
    <Container className="traffic-light-buttons self-start flex flex-row justify-between items-start">
      <ButtonWrapper className="rect-border" height={20}>
        <Minimize onClick={handleMinimize} className="icon min" />
      </ButtonWrapper>
      <ButtonWrapper className="rect-border" height={20}>
        <CropSquareOutlined onClick={handleMaximize} className="icon max" />
      </ButtonWrapper>
      <ButtonWrapper className="close-icon" height={20} backgroundColor="red">
        <CloseOutlined onClick={handleClose} className="icon close" />
      </ButtonWrapper>
    </Container>
  );
}

export const TrafficLightButtonGroup = React.memo(Component);
