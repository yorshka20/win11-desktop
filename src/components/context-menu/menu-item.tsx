import { Divider } from '@mui/material';
import React from 'react';

import { noop } from '../../utils/helper';
import './style.less';

interface ContextMenuItemProps extends ContextMenuItemConfigBase {
  children: React.JSX.Element;
}

function ContextMenuItemWrapper({
  children,
  onClick = noop,
}: ContextMenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row w-full items-center justify-start context-menu-item"
    >
      {children}
    </div>
  );
}

interface ContextMenuItemConfigBase {
  key: string;
  name?: string;
  icon?: string | React.FC<{ className: string }>;
  shortcut?: string;

  className?: string;

  onClick?: () => void;
  onHover?: () => void;

  isDivider?: boolean;
}

interface ContextMenuItemConfigExtends {
  children?: React.JSX.Element;
  render?: (config: ContextMenuItemConfig) => React.JSX.Element;
}

export type ContextMenuItemConfig = ContextMenuItemConfigBase &
  ContextMenuItemConfigExtends;

export function buildFromConfig(config: ContextMenuItemConfig) {
  if (config.render) {
    return config.render(config);
  }

  if (config.children) {
    return (
      <ContextMenuItemWrapper {...config}>
        {config.children}
      </ContextMenuItemWrapper>
    );
  }

  if (config.isDivider) {
    return <Divider className="w-full" key={config.key} />;
  }

  const { icon: Icon, name, shortcut } = config;

  return (
    <ContextMenuItemWrapper {...config}>
      <>
        {Icon &&
          (typeof Icon === 'string' ? (
            <img className="menu-item-icon" src={Icon} />
          ) : (
            <Icon className="menu-item-icon" />
          ))}
        <div className="flex flex-row justify-between items-center w-full">
          <span className={`menu-item ${!Icon && 'no-icon'}`}>{name}</span>
          <span className="shortcut">{shortcut || ''}</span>
        </div>
      </>
    </ContextMenuItemWrapper>
  );
}
