import React from 'react';
import { noop } from 'rxjs';

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
    <TaskBarButtonWrapper
      onclick={onclick}
      className="flex items-center justify-center"
    >
      {typeof Icon === 'string' ? <img src={Icon} /> : <Icon />}
    </TaskBarButtonWrapper>
  );
}

export function TaskBarButtonWrapper({
  children,
  className = '',
  onclick = noop,
}: {
  children: React.JSX.Element;
  className?: string;
  onclick?: () => void;
}) {
  return (
    <div onClick={onclick} className={`taskbar-button-wrapper ${className}`}>
      {children}
    </div>
  );
}
