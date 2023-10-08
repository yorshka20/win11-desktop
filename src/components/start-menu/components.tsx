import { desktopIconConfig } from '../../configs/desktop-config';
import {
  DesktopIconWrapper,
  type DesktopIconWrapperProps,
} from '../desktop-icon';

interface Props extends DesktopIconWrapperProps {}

export function StartMenuIcon({ name, id, grid, icon }: Props) {
  //

  return <DesktopIconWrapper icon={icon} name={name} id={id} grid={grid} />;
}

export function StartMenuPinBlock() {
  return (
    <div className="pin-block draggable-area w-full flex flex-row flex-wrap justify-start items-center">
      {desktopIconConfig.map(({ icon: Icon, name, id, grid }, index) => (
        <StartMenuIcon
          key={index}
          icon={<Icon className={'icon'} />}
          name={name}
          id={id}
          grid={grid}
        />
      ))}
    </div>
  );
}
