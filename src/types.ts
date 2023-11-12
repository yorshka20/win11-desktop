import type { JSX } from 'react';

export type IconType = JSX.Element;

export type Position = [number, number];

export type Size = [number, number];

export type WindowType = 'Explorer' | 'Setting' | 'Image';

export type ThemeType = 'light' | 'dark';

export type SelectionArea = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export interface TaskbarConfigItem {
  name: string;
  icon: string | React.FC;
}
