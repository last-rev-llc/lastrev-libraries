// Custom function to remove duplicates based on a specific property
export const uniqBy = <T>(arr: T[], keyExtractor: (item: T) => any): T[] => {
  const seen = new Set();
  return arr.filter((item) => {
    const key = keyExtractor(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};
