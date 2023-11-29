const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const formatDate = (inputDateStr: string): string | null => {
  if (!inputDateStr) return null;

  const [year, month, day] = inputDateStr.split('-').map(Number);
  const monthName: string = months[month - 1];

  return `${monthName} ${day}, ${year}`;
};
