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

import { ContextMenuItemConfig } from '../components/context-menu';
import { type TaskbarConfigItem } from '../components/task-bar';
import type { WindowType } from '../types';

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
  icon: React.FC<{ className: string }>;
  name: string;
  id: string;
  grid: [number, number];
  windowType: WindowType;
}

export const desktopIconConfig: IconConfig[] = [
  // {
  //   name: 'trash-bin-empty',
  //   icon: trashBinEmptyIcon,
  //   id: 'trash-empty',
  //   grid: [0, 0],
  //   windowType: 'Explorer',
  // },
  // {
  //   name: 'trash-bin-full',
  //   icon: trashBinFullIcon,
  //   id: 'trash-full',
  //   grid: [0, 1],
  //   windowType: 'Explorer',
  // },
  {
    name: 'home',
    icon: Settings,
    id: 'home',
    grid: [0, 2],
    windowType: 'Setting',
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
