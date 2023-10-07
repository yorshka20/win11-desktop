import React from 'react';

import type { Position } from '../../types';

export type WindowType = 'Explorer' | 'Setting' | 'Image';

interface BaseWindowOptions {
  reuse: boolean;
  id: string;
  title: string;
  position: Position;
  zIndex: number;
  size: [number, number];
  content: React.JSX.Element | string;
}

export type Options = BaseWindowOptions;

export type WindowHandler = {
  close: () => void;
  move: (pos: Position) => void;
  maximize: () => void;
  minimize: () => void;
  window: React.JSX.Element;
  data: Options;
};
