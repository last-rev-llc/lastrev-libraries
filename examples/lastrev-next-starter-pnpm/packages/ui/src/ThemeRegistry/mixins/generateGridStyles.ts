import type { Theme } from '@ui/ThemeRegistry/theme.types';

export interface LayoutConfig {
  [key: string]: { [breakpoint: string]: number };
}

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    generateGridStyles: ({ theme, layoutConfig, variant, defaultVariant }: GenerateGridStylesProps) => CSSProperties;
  }
}

interface GenerateGridStylesProps {
  theme: Theme;
  layoutConfig: LayoutConfig;
  variant: any;
  defaultVariant: any;
}

export default function generateGridStyles({ theme, layoutConfig, variant, defaultVariant }: GenerateGridStylesProps) {
  const variantConfig = layoutConfig[variant || defaultVariant] || {};
  let styles = { display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' };

  Object.entries(variantConfig).forEach(([breakpoint, columns]) => {
    return (styles = {
      ...styles,
      [theme.containerBreakpoints.up(breakpoint)]: { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
    });
  });

  return styles;
}
