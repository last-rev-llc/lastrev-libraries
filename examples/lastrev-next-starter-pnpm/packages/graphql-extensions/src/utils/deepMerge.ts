export const deepMerge = (...objects: any[]): any => {
  const output: any = {};

  const isObject = (obj: any) => typeof obj === 'object' && obj !== null;

  objects.forEach((obj) => {
    if (isObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (isObject(obj[key])) {
          if (key in output) {
            output[key] = deepMerge(output[key], obj[key]);
          } else {
            output[key] = obj[key];
          }
        } else {
          output[key] = obj[key];
        }
      });
    }
  });

  return output;
};
