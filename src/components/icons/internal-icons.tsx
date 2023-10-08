import React from 'react';

import explorerIcon from '../../assets/systems/explorer.ico';
import { type CombinedIcons, iconConfigs } from './config';
import { IconWrapper } from './icon-wrapper';
import type { IconWrapperProps } from './icon-wrapper';

export const ExplorerIcon = React.memo(
  (props: Omit<IconWrapperProps, 'src'>) => (
    <IconWrapper {...props} src={explorerIcon} />
  ),
);

export const IconMap: Record<
  string,
  Record<string, React.FC<Omit<IconWrapperProps, 'src'>>>
> = {};

export async function loadIcons() {
  for (const { fileList, load, iconType } of iconConfigs) {
    for (const name of fileList) {
      const file = await load(name as CombinedIcons);
      // console.log('file', file.default);
      if (!IconMap[iconType]) {
        IconMap[iconType] = {};
      }
      IconMap[iconType][name] = (props: Omit<IconWrapperProps, 'src'>) => (
        <IconWrapper {...props} src={file.default} />
      );
    }
  }

  return IconMap;
}
