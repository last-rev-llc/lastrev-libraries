export const checkAndWrapArray = <T>(el: T | undefined): T[] | null => {
  if (Array.isArray(el)) {
    return el;
  } else if (el !== undefined) {
    return [el];
  } else {
    return null;
  }
};
