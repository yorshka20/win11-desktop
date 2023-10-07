import React from 'react';

import { ButtonWrapper } from '../buttons/button-wrapper';
import './style.less';

interface Props {
  icon: string | React.FC;
  name: string;
  onClick?: () => void;
}

export function TaskBarButton({ icon, name, onClick: onClick }: Props) {
  name;
  const Icon = icon;
  return (
    <ButtonWrapper
      onClick={onClick}
      className="taskbar-button flex items-center justify-center"
    >
      {typeof Icon === 'string' ? <img src={Icon} /> : <Icon />}
    </ButtonWrapper>
  );
}
