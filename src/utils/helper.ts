import darkWallpaper from '../assets/wallpaper/dark.jpg';
import lightWallpaper from '../assets/wallpaper/light.jpg';
import type { WindowType } from '../types';

export function noop() {
  //
}

type ResolveType = (value: PromiseLike<undefined> | undefined) => void;

export function createPromise(): [ResolveType, Promise<undefined>] {
  let resolve: ResolveType = noop;
  const p = new Promise<undefined>((res) => {
    resolve = res;
  });
  return [resolve as ResolveType, p];
}

export function generateWallpaperUrl(wallpaper: string) {
  switch (wallpaper) {
    case 'dark':
      return darkWallpaper;
    case 'light':
      return lightWallpaper;

    default:
      return lightWallpaper;
  }
}

export function createWindowId(type: WindowType): string {
  return `Window-${type}-${Math.random().toString(36).substring(2, 8)}`;
}
