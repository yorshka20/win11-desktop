import React from 'react';

import { ButtonWrapper } from '../buttons/button-wrapper';
import './style.less';

interface Props {
  icon: string | React.FC;
  name: string;
  id?: string;
  onClick?: () => void;
}

export function TaskBarButton({ icon, id, name, onClick: onClick }: Props) {
  const Icon = icon;
  return (
    <ButtonWrapper
      title={name}
      onClick={onClick}
      id={id}
      className="taskbar-button flex items-center justify-center"
    >
      {typeof Icon === 'string' ? <img src={Icon} /> : <Icon />}
    </ButtonWrapper>
  );
}
