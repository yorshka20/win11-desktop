import {
  AddBoxOutlined,
  SafetyCheck,
  SearchOutlined,
  Settings,
} from '@mui/icons-material';

import trashBinEmptyIcon from '../assets/trash-bin-empty.ico';
import trashBinFullIcon from '../assets/trash-bin-full.ico';

export const taskbarButtonsConfig = [
  {
    name: 'start',
    icon: SearchOutlined,
  },
  {
    name: 'search',
    icon: SearchOutlined,
  },
  {
    name: 'test1',
    icon: SafetyCheck,
  },
  {
    name: 'test2',
    icon: Settings,
  },
  {
    name: 'test3',
    icon: AddBoxOutlined,
  },
];

export const desktopIconConfig = [
  {
    name: 'trash-bin-empty',
    src: trashBinEmptyIcon,
  },
  {
    name: 'trash-bin-full',
    src: trashBinFullIcon,
  },
];
