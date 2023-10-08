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
