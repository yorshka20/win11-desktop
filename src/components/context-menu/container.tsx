import React from 'react';

import { contextMenuConfig } from '../../configs/desktop-config';
import { useContextState } from '../../hooks';
import {
  ContextMenu,
  type ContextMenuItemConfig,
  buildFromConfig,
  useContextMenu,
} from './index';

function menuContent(configs: ContextMenuItemConfig[]): React.JSX.Element {
  return <>{configs.map((item) => buildFromConfig(item))}</>;
}

export const SystemContextMenu = React.memo(() => {
  // calculate the position of system context menu
  const position = useContextMenu();

  const showContextMenu = useContextState('showContextMenu');

  return (
    <ContextMenu position={position} show={showContextMenu}>
      {menuContent(contextMenuConfig as ContextMenuItemConfig[])}
    </ContextMenu>
  );
});
