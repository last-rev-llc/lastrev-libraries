export const isEmpty = (value: any): boolean => {
  if (value == null) {
    // Check for null or undefined
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    // Check for string or array emptiness
    return value.length === 0;
  }

  if (typeof value === 'object') {
    // Check for object emptiness
    return Object.keys(value).length === 0;
  }

  if (typeof value.size !== 'undefined') {
    // Check for Map or Set emptiness
    return value.size === 0;
  }

  // Return false for all other types of values
  return false;
};
