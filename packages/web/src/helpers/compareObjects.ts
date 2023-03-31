export const compareObjects = (obj1: any, obj2: any, ignoredKeys: string[] = [], path: string[] = []) => {
  let mismatchedKeys: string[] = [];

  const keys1 = new Set(Object.keys(obj1));
  const keys2 = new Set(Object.keys(obj2));

  // Find and process keys unique to obj1
  for (const key of Array.from(keys1)) {
    if (ignoredKeys.includes(key)) {
      continue;
    }
    if (!keys2.has(key)) {
      mismatchedKeys.push([...path, key].join('.'));
    } else {
      const newPath = [...path, key];
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (Array.isArray(value1) && Array.isArray(value2)) {
        if (value1.length !== value2.length || !value1.every((v, i) => v === value2[i])) {
          mismatchedKeys.push(newPath.join('.'));
        }
      } else if (typeof value1 === 'object' && value1 !== null) {
        mismatchedKeys.push(...compareObjects(value1, value2, ignoredKeys, newPath));
      } else if (value1 !== value2) {
        mismatchedKeys.push(newPath.join('.'));
      }
    }
  }

  // Find and process keys unique to obj2
  for (const key of Array.from(keys2)) {
    if (!keys1.has(key)) {
      mismatchedKeys.push([...path, key].join('.'));
    }
  }

  return mismatchedKeys;
};
