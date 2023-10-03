export const deepMerge = (obj1: any, obj2: any): any => {
  const output = { ...obj1 };
  if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
    Object.keys(obj2).forEach((key) => {
      if (typeof obj2[key] === 'object' && obj2[key] !== null) {
        if (key in obj1) {
          output[key] = deepMerge(obj1[key], obj2[key]);
        } else {
          output[key] = obj2[key];
        }
      } else {
        output[key] = obj2[key];
      }
    });
  }
  return output;
};
