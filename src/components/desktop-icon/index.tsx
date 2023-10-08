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

  grided?: boolean;
  shadowText?: boolean;

  onClick?: (id: string) => void;
  onDoubleClick?: (id: string) => void;
}

interface StyledProps {
  color?: string;
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
  }

  p {
    margin: 0;

    /* display in two lines and ellipse for overflow  */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    color: ${(props) => props.color};
    font-size: 12px;

    text-align: center;

    width: 100%;

    &.text-shadow {
      color: white;
      text-shadow: black 0.1em 0.1em 0.2em;
    }
  }
`;

export function DesktopIconWrapper({
  name,
  id,
  grid,
  grided = false,
  icon: Icon,
  shadowText,
  color = 'black',
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
    let x = data.x;
    let y = data.y;
    if (grided) {
      x = Math.round(data.x / DESKTOP_GRID_SIZE) * DESKTOP_GRID_SIZE;
      y = Math.round(data.y / DESKTOP_GRID_SIZE) * DESKTOP_GRID_SIZE;
    }
    setPosition({ x, y });
  };

  console.log('icon', grid);

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
      bounds={'parent'}
      onStop={handleStop}
    >
      <Container
        onClick={handleClick}
        className={cls(
          'desktop-icon-container flex flex-col justify-start items-center',
          focused ? 'focused' : '',
          selected ? 'selected' : '',
        )}
        color={color}
        hoverBgColor={hoverBgColor}
        selectedBgColor={selectedBgColor}
      >
        {typeof Icon === 'string' ? <img src={Icon} className="icon" /> : Icon}
        <p className={`${shadowText ? 'text-shadow' : ''}`}>{name}</p>
      </Container>
    </Draggable>
  );
}
