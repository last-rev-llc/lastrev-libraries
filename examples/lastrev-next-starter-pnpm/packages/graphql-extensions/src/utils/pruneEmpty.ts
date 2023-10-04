export const pruneEmpty = (obj: any): any => {
  return (function prune(current: any): any {
    Object.keys(current).forEach((key) => {
      const value = current[key];

      if (
        value === undefined ||
        value === null ||
        Number.isNaN(value) ||
        (typeof value === 'string' && value.trim() === '') ||
        (isObjectLike(value) && key !== 'json' && isEmpty(prune(value)))
      ) {
        delete current[key];
      }
    });

    if (Array.isArray(current)) {
      for (let i = current.length - 1; i >= 0; i--) {
        if (current[i] === undefined) {
          current.splice(i, 1);
        }
      }
    }

    return current;
  })(cloneDeep(obj));
};

const isObjectLike = (value: any): boolean => {
  return typeof value === 'object' && value !== null;
};

const isEmpty = (obj: any): boolean => {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else if (isObjectLike(obj)) {
    return Object.keys(obj).length === 0;
  } else {
    return false;
  }
};

const cloneDeep = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj));
};
