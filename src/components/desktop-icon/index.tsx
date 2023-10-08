import cls from 'classnames';
import { useCallback, useState } from 'react';
import Draggable, { type DraggableEventHandler } from 'react-draggable';
import { styled } from 'styled-components';

import { DESKTOP_GRID_SIZE } from '../../constants';
import { IconType } from '../../types';
import { noop } from '../../utils/helper';

interface Props extends StyledProps {
  name: string;
  id: string;
  icon: IconType;
  grid: [number, number];

  shadowText?: boolean;

  onClick?: (id: string) => void;
  onDoubleClick?: (id: string) => void;
}

interface StyledProps {
  hoverBgColor?: string;
  selectedBgColor?: string;
}

const Container = styled.div<StyledProps>`
  width: 62px;
  max-height: 82px;

  box-sizing: border-box;
  margin: 4px;

  border: 1px dashed transparent;
  border-radius: 4px;

  user-select: none;

  &.focused {
    border-color: #999;
  }

  &.selected {
    background-color: ${(props) => props.selectedBgColor};
    border-color: #999;
  }

  &:hover {
    background-color: ${(props) => props.hoverBgColor};
  }

  .icon {
    width: 40px;
    height: 40px;
    margin-bottom: 4px;

    user-select: none;
    -webkit-user-drag: none;
  }

  .name {
    margin: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    color: black;
    font-size: 12px;

    text-align: center;

    width: 100%;
    // max-height: 2rem;

    &.shadow {
      color: white;
      text-shadow: black 0.1em 0.1em 0.2em;
    }
  }
`;

export function DesktopIconWrapper({
  name,
  id,
  grid,
  icon: Icon,
  shadowText,
  hoverBgColor = 'rgba(240, 248, 255, 0.3)',
  selectedBgColor = 'rgba(240, 248, 255, 0.5)',
  onClick = noop,
}: Props) {
  const [focused] = useState(false);
  const [selected, setSelected] = useState(false);

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: grid[0] * 100,
    y: grid[1] * 100,
  });

  const handleClick = useCallback(() => {
    setSelected(true);

    onClick(id);
  }, [onClick, id]);

  const handleStop: DraggableEventHandler = (_, data) => {
    const x = Math.round(data.x / DESKTOP_GRID_SIZE) * DESKTOP_GRID_SIZE;
    const y = Math.round(data.y / DESKTOP_GRID_SIZE) * DESKTOP_GRID_SIZE;
    setPosition({ x, y });
  };

  return (
    <Draggable
      axis="both"
      handle=".desktop-icon-container"
      defaultPosition={{ x: 0, y: 0 }}
      position={position}
      grid={[5, 5]}
      scale={1}
      // onStart={handleStart}
      // onDrag={handleDrag}
      onStop={handleStop}
    >
      <Container
        onClick={handleClick}
        className={cls(
          'desktop-icon-container flex flex-col justify-start items-center',
          focused ? 'focused' : '',
          selected ? 'selected' : '',
        )}
        hoverBgColor={hoverBgColor}
        selectedBgColor={selectedBgColor}
      >
        {typeof Icon === 'string' ? (
          <img src={Icon} className="icon" />
        ) : (
          <Icon className={'icon'} />
        )}
        <p className={`name ${shadowText ? 'shadow' : ''}`}>{name}</p>
      </Container>
    </Draggable>
  );
}
