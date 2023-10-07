import cls from 'classnames';
import { useCallback, useState } from 'react';
import Draggable, { type DraggableEventHandler } from 'react-draggable';

import { IconType } from '../../types';
import { noop } from '../../utils/helper';
import './style.less';

interface Props {
  name: string;
  id: string;
  icon: IconType;
  grid: [number, number];
  shadowText?: boolean;
  onClick?: (id: string) => void;
  onDoubleClick?: (id: string) => void;
}

export function DesktopIconWrapper({
  name,
  id,
  grid,
  icon: Icon,
  shadowText,
  onClick = noop,
}: Props) {
  const [focused] = useState(false);
  const [selected, setSelected] = useState(false);

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: grid[0] * 100,
    y: grid[1] * 100,
  });

  const handleClick = useCallback(() => {
    setSelected((f) => !f);

    onClick(id);
  }, [onClick, id]);

  const handleStop: DraggableEventHandler = (_, data) => {
    const x = Math.round(data.x / 100) * 100;
    const y = Math.round(data.y / 100) * 100;
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
      <div
        onClick={handleClick}
        className={cls(
          'desktop-icon-container flex flex-col justify-start items-center',
          focused ? 'focused' : '',
          selected ? 'selected' : '',
        )}
      >
        {typeof Icon === 'string' ? (
          <img src={Icon} className="icon" />
        ) : (
          <Icon className={'icon'} />
        )}
        <p className={`name ${shadowText ? 'shadow' : ''}`}>{name}</p>
      </div>
    </Draggable>
  );
}
