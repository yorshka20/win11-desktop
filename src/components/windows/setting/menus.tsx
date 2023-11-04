import { List, ListItem, ListItemDecorator } from '@mui/joy';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getIconGroup } from '../../icons/internal-icons';
import { menuList } from './config';

const MenuBlockDiv = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: hidden auto;

  .menu-wrapper {
    max-height: 100%;

    overflow: hidden auto;
    .menu-item {
      height: 30px;

      border-radius: 4px;

      margin-bottom: 8px;

      .icon {
        width: 15px;
        height: 15px;
      }
    }

    .menu-item:hover {
      background-color: #e7ebf0;
    }
  }

  .active-menu-item {
    &::before {
      content: '';
      width: 2px;
      height: 80%;
      background-color: rgb(0, 103, 192);
    }

    background-color: #e7ebf0;
  }
`;

const emptyIcon = () => <></>;

export function MenuBlock({ onActiveItemChange }) {
  const [menuItemList, setMenuItemList] = useState(menuList);

  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    getIconGroup('system').then((res) => {
      console.log('res', res);
      const list = menuList.map((item) => ({
        ...item,
        icon: res[item.key] || res['system'],
      }));
      setMenuItemList(list);
    });
  }, []);

  const handleClick = (key: string) => {
    setActiveItem(key);
    onActiveItemChange(key);
  };

  return (
    <MenuBlockDiv>
      <List
        className="w-full menu-wrapper"
        aria-labelledby="decorated-list-demo"
      >
        {menuItemList.map(({ key, title, icon: Icon = emptyIcon }) => (
          <ListItem
            key={key}
            className={`menu-item ${
              activeItem === key ? 'active-menu-item' : ''
            }`}
            onClick={handleClick.bind(null, key)}
          >
            <ListItemDecorator>
              <Icon />
            </ListItemDecorator>
            {title}
          </ListItem>
        ))}
      </List>
    </MenuBlockDiv>
  );
}

export function SettingContentBlock({ activeItem }: { activeItem: string }) {
  return <div className="content w-full h-full flex-1">{activeItem}</div>;
}
