import { breakpointsMinMax } from '../ThemeRegistry/theme';

export const generateCardImageSizes = (layoutConfig: any, variant: any): string => {
  const variantConfig = layoutConfig[variant];

  if (!variantConfig) return '';
  let sizesString = '';

  Object.entries(breakpointsMinMax).forEach(([breakpoint, value], index) => {
    const columns =
      variantConfig[breakpoint] || (index === 0 ? 1 : variantConfig[Object.keys(variantConfig)[index - 1]]);

    if (columns) {
      const size = 100 / columns;
      sizesString += `${index > 0 ? ', ' : ''}(min-width: ${value}px) ${size}vw`;
    }
  });

  return sizesString;
};
