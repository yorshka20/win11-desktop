import React from 'react';

type MenuItemType = {
  icon?: React.FC;
  key: string;
  title: string;
};

export const menuList: MenuItemType[] = [
  {
    key: 'system',
    title: 'system',
  },
  {
    key: 'bluetooth',
    title: 'bluetooth',
  },
  {
    key: 'network',
    title: 'network',
  },
  {
    key: 'customize',
    title: 'customize',
  },
  {
    key: 'application',
    title: 'application',
  },
  {
    key: 'account',
    title: 'account',
  },
  {
    key: 'region',
    title: 'time and region',
  },
  {
    key: 'game',
    title: 'game',
  },
  {
    key: 'help',
    title: 'help',
  },
  {
    key: 'security',
    title: 'privacy and security',
  },
  {
    key: 'update',
    title: 'window update',
  },
];
