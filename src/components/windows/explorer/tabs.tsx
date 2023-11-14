import { AddOutlined } from '@mui/icons-material';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Draggable, {
  DraggableData,
  DraggableEventHandler,
} from 'react-draggable';
import { styled } from 'styled-components';

interface Props {
  id: string;
}

const Container = styled.div`
  padding-left: 10px;
`;

type TabItem = {
  id: string;
  name: string;
  index: number;
};

function Component({ id }: Props) {
  id;

  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: '1',
      name: 'main',
      index: 0,
    },
    {
      id: '2',
      name: 'main1',
      index: 1,
    },
  ]);

  const [activeTab, setActiveTab] = useState<string>('1');

  const handleClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleDrag = (id: string, data: DraggableData) => {
    console.log('delta', data.deltaX);
    const isLeft = data.deltaX < 0;
    const tab = tabs.find((i) => i.id === id)!;
    const tmp = isLeft
      ? tabs[tabs.indexOf(tab) - 1]
      : tabs[tabs.indexOf(tab) + 1];
    const list = tabs.map((t, i) => {
      if (tabs[i + 1]?.id === id) {
        return tab ?? t;
      }
      if (tabs[i].id === id) {
        return tmp ?? t;
      }
      return t;
    });

    setTabs(list);
  };

  return (
    <Container className="tabs-container flex flex-row self-end justify-start items-end">
      <div className="tabs-group flex flex-row justify-start items-end">
        {tabs.map((tab) => (
          <TabItem
            id={tab.id}
            onDrag={handleDrag}
            onClick={handleClick}
            key={tab.index}
            active={activeTab === tab.id}
            name={tab.name}
          />
        ))}
      </div>
      <AddOutlined />
    </Container>
  );
}

interface ItemProps {
  id: string;
  name: string;
  active?: boolean;
  onClick: (id: string) => void;
  onDrag: (id: string, data: DraggableData) => void;
}

interface TabStyleProps {
  $border: string;
  $background: string;
}

const TabContainer = styled.div<TabStyleProps>`
  min-width: 80px;
  height: 30px;

  background-color: ${(props) => props.$background};

  border: ${(props) => props.$border};
  border-bottom: none;
  border-radius: 8px 8px 0 0;
`;

function TabItem({ name, id, onDrag, onClick, active }: ItemProps) {
  const dragRef = useRef<HTMLDivElement>(null);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClick(id);
  };

  const handleDragStop: DraggableEventHandler = (_, data) => {
    onDrag(id, data);
  };

  return (
    <Draggable
      axis="x"
      defaultPosition={{ x: 0, y: 0 }}
      grid={[80, 0]}
      scale={1}
      onDrag={handleDragStop}
      nodeRef={dragRef}
    >
      <TabContainer
        className={classNames('flex justify-center items-center align-middle')}
        onClick={handleClick}
        ref={dragRef}
        $border={!active ? 'none' : '1px solid #ceddec'}
        $background={!active ? '#ceddec' : '#f0f5f9'}
      >
        {name}
      </TabContainer>
    </Draggable>
  );
}

export const WindowTabs = React.memo(Component);
