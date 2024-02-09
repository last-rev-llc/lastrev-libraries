export const kebabCase = (str: string): string => {
  return (
    str
      // Replace non-word characters (not letter or number) and upper-case letters with a space plus the letter
      .replace(/([^\w]|_)+/g, ' ')
      .replace(/[A-Z]/g, (match) => ` ${match.toLowerCase()}`)
      // Remove spaces from the start and end of the string
      .trim()
      // Replace spaces with dashes
      .replace(/\s+/g, '-')
  );
};
