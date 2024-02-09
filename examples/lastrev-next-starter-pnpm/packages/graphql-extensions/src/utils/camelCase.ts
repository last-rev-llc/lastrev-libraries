export const camelCase = (str: string): string => {
  // Remove non-alphanumeric characters
  const alphanumericStr = str.replace(/[^a-zA-Z0-9]+/g, ' ');

  return alphanumericStr.replace(/(?:^\w|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};
