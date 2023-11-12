import React from 'react';

import explorerIcon from '../../assets/systems/explorer.ico';
import { createPromise } from '../../utils/helper';
import {
  type CombinedIcons,
  GroupNameType,
  IconNameType,
  iconConfigs,
} from './config';
import type { IconWrapperProps } from './icon-wrapper';
import { IconWrapper } from './icon-wrapper';

export const ExplorerIcon = React.memo(
  (props: Omit<IconWrapperProps, 'src'>) => (
    <IconWrapper {...props} src={explorerIcon} />
  ),
);

export const IconMap: Record<
  string,
  Record<string, React.FC<Omit<IconWrapperProps, 'src'>>>
> = {};

const [resolve, promise] = createPromise();

// eslint-disable-next-line react-refresh/only-export-components
export async function loadIcons() {
  for (const { fileList, load, iconType } of iconConfigs) {
    for (const name of fileList) {
      const file = await load(name as CombinedIcons);
      if (!IconMap[iconType]) {
        IconMap[iconType] = {};
      }
      IconMap[iconType][name] = (props: Omit<IconWrapperProps, 'src'>) => (
        <IconWrapper {...props} src={file.default} />
      );
    }
  }

  resolve(undefined);

  return IconMap;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getIconGroup(group: string) {
  await promise;
  return IconMap[group];
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getIconByGroupAndName<T extends GroupNameType>(
  group: T,
  name: IconNameType<T>,
) {
  await promise;
  console.log(IconMap[group]);
  return IconMap[group][name];
}
