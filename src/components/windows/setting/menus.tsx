import { List, ListItem, ListItemDecorator } from '@mui/joy';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getIconGroup } from '../../icons/internal-icons';
import { menuList } from './config';

const MenuBlockDiv = styled.div`
  display: flex;

  .active-menu-item {
    &::before {
      content: '';
      width: 2px;
      height: 100%;
      background-color: blue;
    }

    background-color: #e7ebf0;
  }
`;

const emptyIcon = () => <></>;

export function MenuBlock() {
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
            onClick={() => {
              setActiveItem(key);
            }}
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
