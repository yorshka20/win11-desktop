// create a logger method with scope
export function createLogger(scope) {
  return function log(...args) {
    console.log(`[${scope}]`, ...args);
  };
}
