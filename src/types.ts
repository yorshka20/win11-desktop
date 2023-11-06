import type { JSX } from 'react';

export type IconType = JSX.Element;

export type Position = [number, number];

export type Size = [number, number];

export type WindowType = 'Explorer' | 'Setting' | 'Image';

export type SelectionArea = {
  x: number;
  y: number;
  w: number;
  h: number;
};
