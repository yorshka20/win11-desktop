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
import React from 'react';

import trashBinEmptyIcon from '../assets/trash-bin-empty.ico';
import trashBinFullIcon from '../assets/trash-bin-full.ico';
import { ContextMenuItemConfig } from '../components/context-menu';
import { type TaskbarConfigItem } from '../components/task-bar';

export const taskbarButtonsConfig: TaskbarConfigItem[] = [
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

interface IconConfig {
  icon: string | React.FC<{ className: string }>;
  name: string;
  id: string;
  grid: [number, number];
}

export const desktopIconConfig: IconConfig[] = [
  {
    name: 'trash-bin-empty',
    icon: trashBinEmptyIcon,
    id: 'trash-empty',
    grid: [0, 0],
  },
  {
    name: 'trash-bin-full',
    icon: trashBinFullIcon,
    id: 'trash-full',
    grid: [0, 1],
  },
  {
    name: 'home',
    icon: Settings,
    id: 'home',
    grid: [0, 2],
  },
];

export const contextMenuConfig: ContextMenuItemConfig[] = [
  {
    name: 'copy',
    key: 'copy',
    icon: CopyAllOutlined,
    shortcut: 'ctrl+c',
  },
  {
    name: 'paste',
    key: 'paste',
    icon: ContentPasteOutlined,
    shortcut: 'ctrl+v',
  },
  {
    name: 'cut',
    key: 'cut',
    icon: ContentCutOutlined,
    shortcut: 'ctrl+x',
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
    shortcut: 'shift+f10',
  },
];
