import darkWallpaper from '../assets/wallpaper/dark.jpg';
import lightWallpaper from '../assets/wallpaper/light.jpg';

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
