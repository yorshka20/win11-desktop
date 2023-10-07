export type WindowType = 'Explorer' | 'Setting' | 'Image';

interface BaseWindowOptions {
  reuse: boolean;
  title: string;
  position: Position;
  zIndex: number;
  size: [number, number];
}

export type Options = BaseWindowOptions;

export type Position = [number, number];
export type Size = [number, number];

export type WindowHandler = {
  window: unknown;
  close: () => void;
  move: (pos: Position) => void;
  maximize: () => void;
  minimize: () => void;
};
