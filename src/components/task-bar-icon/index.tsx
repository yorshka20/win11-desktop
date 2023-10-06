import React from 'react';

import { ButtonWrapper } from '../buttons/button-wrapper';
import './style.less';

interface Props {
  icon: string | React.FC;
  name: string;
  onclick?: () => void;
}

export function TaskBarButton({ icon, name, onclick }: Props) {
  name;
  const Icon = icon;
  return (
    <ButtonWrapper
      onclick={onclick}
      className="taskbar-button flex items-center justify-center"
    >
      {typeof Icon === 'string' ? <img src={Icon} /> : <Icon />}
    </ButtonWrapper>
  );
}
