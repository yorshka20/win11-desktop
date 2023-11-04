import React, { useCallback } from 'react';

import { useWindowContext } from '../../hooks';
import { ButtonWrapper } from '../buttons/button-wrapper';
import './style.less';

interface Props {
  icon: string | React.JSX.Element;
  name: string;
  id: string;
  onClick?: () => void;
}

export function TaskBarButton({ icon: Icon, id, name, onClick }: Props) {
  const { dispatcher } = useWindowContext();

  const handleClick = useCallback(() => {
    onClick?.();
    dispatcher('click-taskbar-icon', id);
  }, [dispatcher, onClick, id]);

  return (
    <ButtonWrapper
      title={name}
      onClick={handleClick}
      id={id}
      className="taskbar-button flex items-center justify-center"
    >
      {typeof Icon === 'string' ? <img src={Icon} /> : Icon}
    </ButtonWrapper>
  );
}
