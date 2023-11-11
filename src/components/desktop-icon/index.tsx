import cls from 'classnames';
import { useCallback, useMemo, useRef, useState } from 'react';
import Draggable, { type DraggableEventHandler } from 'react-draggable';
import { styled } from 'styled-components';

import { DESKTOP_GRID_SIZE } from '../../constants';
import { store } from '../../context/store';
import { useWindowContext } from '../../hooks';
import { type IconType, Position } from '../../types';
import { noop } from '../../utils/helper';

export interface DesktopIconWrapperProps {
  name: string;
  id: string;
  icon: IconType;
  // layout pos
  grid: [number, number];

  // should not be positioned in grid. default is grided.
  ungrided?: boolean;
  selected: boolean;
  shadowText?: boolean;

  // styled props.
  color?: string;
  hoverBgColor?: string;
  selectedBgColor?: string;
  // styled props.

  onClick?: (id: string) => void;
  onDoubleClick?: (id: string) => void;
}

interface StyledProps {
  $color?: string;
  $borderColor?: string;
  $hoverBgColor?: string;
  $selectedBgColor?: string;
}

const Container = styled.div<StyledProps>`
  position: fixed;

  width: 60px;
  height: 80px;

  box-sizing: border-box;
  margin: 4px;

  border: 1px dashed transparent;
  border-radius: 4px;

  user-select: none;

  border-color: ${(props) => props.$borderColor};
  background-color: ${(props) => props.$selectedBgColor};

  &:hover {
    background-color: ${(props) => props.$hoverBgColor};
  }

  .icon {
    width: 100%;
    min-height: 40px;
    flex: 1;
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

    color: ${(props) => props.$color};
    font-size: 12px;

    text-align: center;

    width: 100%;

    &.text-shadow {
      color: white;
      text-shadow: black 0.1em 0.1em 0.2em;
    }
  }
`;

function getRoundPosition([x, y]: Position): Position {
  return [
    Math.round(x / DESKTOP_GRID_SIZE.x) * DESKTOP_GRID_SIZE.x,
    Math.round(y / DESKTOP_GRID_SIZE.y) * DESKTOP_GRID_SIZE.y,
  ];
}

export function DesktopIconWrapper({
  name,
  id,
  grid,
  selected,
  icon: Icon,
  shadowText,
  ungrided = false,
  color = 'black',
  hoverBgColor = 'rgba(240, 248, 255, 0.3)',
  selectedBgColor = 'rgba(240, 248, 255, 0.5)',
  onClick = noop,
}: DesktopIconWrapperProps) {
  const dragRef = useRef<HTMLDivElement>(null);

  const { dispatcher } = useWindowContext();

  const [position, setPosition] = useState<Position>([
    DESKTOP_GRID_SIZE.x * grid[0],
    DESKTOP_GRID_SIZE.y * grid[1],
  ]);

  const sbgColor = useMemo(() => {
    if (selected) {
      return selectedBgColor;
    }
    return 'transparent';
  }, [selected, selectedBgColor]);

  const handleClick = useCallback(() => {
    store.updateState('selectedDesktopIcons', [id]);
    onClick(id);
  }, [onClick, id]);

  // double click icon to trigger command
  const handleDoubleClick = useCallback(() => {
    dispatcher('click-desktop-icon', {
      name: id,
      type: 'window',
    });
  }, [id, dispatcher]);

  const handleStop: DraggableEventHandler = (_, data) => {
    let pos = {} as Position;
    if (!ungrided) {
      pos = getRoundPosition([data.x, data.y]);
    }
    setPosition(pos);
  };

  return (
    <Draggable
      axis="both"
      defaultPosition={{ x: 0, y: 0 }}
      position={{ x: position[0], y: position[1] }}
      grid={[4, 4]}
      scale={1}
      // onStart={handleStart}
      // onDrag={handleDrag}
      bounds={'parent'}
      onStop={handleStop}
      nodeRef={dragRef}
    >
      <Container
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={cls(
          'desktop-icon-container',
          'flex flex-col justify-start items-center',
        )}
        ref={dragRef}
        $color={color}
        $borderColor={selected ? '#999' : 'transparent'}
        $hoverBgColor={hoverBgColor}
        $selectedBgColor={sbgColor}
      >
        {typeof Icon === 'string' ? <img src={Icon} className="icon" /> : Icon}
        <p className={`${shadowText ? 'text-shadow' : ''}`}>{name}</p>
      </Container>
    </Draggable>
  );
}
