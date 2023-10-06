import { Input } from '@mui/material';

import { useContextState } from '../../hooks';
import './style.less';

export function StartMenu() {
  const show = useContextState('showStartMenu');

  return (
    <div
      style={{ visibility: show ? 'visible' : 'hidden' }}
      className="flex flex-col justify-between items-start start-menu-container"
    >
      <div className="start-menu-content flex flex-col flex-1">
        <Input />
        <div>dsasd</div>
      </div>
      <div className="w-full flex flex-row justify-between items-center start-menu-footer">
        1 2
      </div>
    </div>
  );
}
