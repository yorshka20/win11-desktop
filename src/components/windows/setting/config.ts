import systemIcon from '../../../assets/systems/system.ico';

const icons = {
  system: systemIcon,
  bluetooth: systemIcon,
  network: systemIcon,
  personalization: systemIcon,
  application: systemIcon,
  account: systemIcon,
  time: systemIcon,
  game: systemIcon,
  assistance: systemIcon,
  privacy: systemIcon,
  update: systemIcon,
};

type MenuItemType = {
  icon: string;
  key: string;
  title: string;
};

console.log(icons);

export const menuList: MenuItemType[] = [
  {
    icon: icons['system'],
    key: 'general',
    title: 'General',
  },
  {
    icon: icons['bluetooth'],
    key: 'system',
    title: 'system',
  },
  {
    icon: icons['bluetooth'],
    key: 'bluetooth',
    title: 'bluetooth',
  },
  {
    icon: icons['network'],
    key: 'network',
    title: 'network',
  },
  {
    icon: icons['personalization'],
    key: 'customize',
    title: 'customize',
  },
  {
    icon: icons['application'],
    key: 'application',
    title: 'application',
  },
  {
    icon: icons['account'],
    key: 'account',
    title: 'account',
  },
  {
    icon: icons['time'],
    key: 'region',
    title: 'time and region',
  },
  {
    icon: icons['game'],
    key: 'game',
    title: 'game',
  },
  {
    icon: icons['assistance'],
    key: 'assistance',
    title: 'assistance',
  },
  {
    icon: icons['privacy'],
    key: 'security',
    title: 'privacy and security',
  },
  {
    icon: icons['update'],
    key: 'update',
    title: 'window update',
  },
];
