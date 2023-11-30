export const formatNameForSorting = (name: string): string => {
  const parts = name.split(' ');
  const lastName = parts.pop() || '';
  const firstNameMiddle = parts.join(' ');
  return `${lastName}, ${firstNameMiddle}`;
};
