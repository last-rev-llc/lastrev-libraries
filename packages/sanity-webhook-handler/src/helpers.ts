export const stringify = (r: any): string | undefined => {
  try {
    return JSON.stringify(r);
  } catch (_e) {
    return undefined;
  }
};
