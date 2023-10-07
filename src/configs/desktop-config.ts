import {
  AddBoxOutlined,
  ContentCutOutlined,
  ContentPasteOutlined,
  CopyAllOutlined,
  OpenWithOutlined,
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

export const contextMenuConfig = [
  {
    name: 'copy',
    key: 'copy',
    icon: CopyAllOutlined,
  },
  {
    name: 'paste',
    key: 'paste',
    icon: ContentPasteOutlined,
  },
  {
    name: 'cut',
    key: 'cut',
    icon: ContentCutOutlined,
  },
  { key: 'divider-1', isDivider: true },
  {
    name: 'open',
    key: 'open',
    icon: OpenWithOutlined,
  },
  {
    name: 'open',
    key: 'open1',
  },
  {
    name: 'adasd',
    key: 'open2',
  },
  {
    key: 'divider-2',
    isDivider: true,
  },
  {
    name: 'test',
    key: 'test1',
    icon: ContentPasteOutlined,
  },
];
