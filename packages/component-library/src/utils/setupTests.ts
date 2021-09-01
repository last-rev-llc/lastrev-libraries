/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
 if (typeof global.window !== 'undefined') {
  global.window.matchMedia =
    global.window.matchMedia ||
    function matchMetdata() {
      return {
        matches: false,
        addListener() {},
        removeListener() {}
      };
    };
}
