export { default as client } from './client';

export const parseBooleanEnvVar = (value: string = '') => {
  // values parsed as true: true, 1, yes, y, => ignore caps
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};
