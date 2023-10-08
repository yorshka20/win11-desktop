import React from 'react';

import explorerIcon from '../../assets/systems/explorer.ico';
import { createPromise } from '../../utils/helper';
import { type CombinedIcons, iconConfigs } from './config';
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

const [resolve, p] = createPromise();

export const loadIconPromise = p;

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
