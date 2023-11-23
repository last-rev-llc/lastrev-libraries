// import { type Theme } from '@mui/material/styles';
import { type CSSProperties } from '@mui/material/styles/createMixins';
import { Theme } from '../theme.types';
type ApplyColorScheme = (args: { theme: Theme; ownerState: any }) => CSSProperties;

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    applyColorScheme: ApplyColorScheme;
  }
}

export const applyColorScheme: ApplyColorScheme = ({ ownerState, theme }: { ownerState?: any; theme: Theme }) => {
  const colorScheme: string = ownerState?.color || ownerState?.backgroundColor || ownerState?.colorScheme;
  if (!colorScheme) return {};
  let styles = {};
  let backgroundKey = 'backgroundColor';
  if (colorScheme?.toLowerCase()?.includes('gradient')) {
    backgroundKey = 'background';
  }
  const paletteColor = colorScheme?.includes('.') ? colorScheme.split('.')[0] : `${colorScheme}`;

  if (colorScheme && theme.vars.palette.schemes[paletteColor]) {
    styles = {
      [backgroundKey]: theme.vars.palette.schemes[paletteColor].primary.main,
      '--mui-palette-background-tab': theme.vars.palette.schemes[paletteColor].primary.main,
      '--mui-palette-overline': theme.vars.palette.schemes[paletteColor].overline,
      '--swiper-theme-color': theme.vars.palette.schemes[paletteColor].primary.contrastText,

      // Color inversion
      '--mui-palette-text-primary': theme.vars.palette.schemes[paletteColor].primary.contrastText,
      '--mui-palette-background-paper': theme.vars.palette.schemes[paletteColor].dark,
      '--mui-palette-primary-light': theme.vars.palette.schemes[paletteColor].secondary.light,
      '--mui-palette-primary-main': theme.vars.palette.schemes[paletteColor].secondary.main,
      '--mui-palette-primary-contrastText': theme.vars.palette.schemes[paletteColor].secondary.contrastText,
      '--mui-palette-primary-dark': theme.vars.palette.schemes[paletteColor].secondary.dark,

      '--mui-palette-secondary-light': theme.vars.palette.schemes[paletteColor].primary.light,
      '--mui-palette-secondary-main': theme.vars.palette.schemes[paletteColor].primary.main,
      '--mui-palette-secondary-contrastText': theme.vars.palette.schemes[paletteColor].primary.contrastText,
      '--mui-palette-secondary-dark': theme.vars.palette.schemes[paletteColor].primary.dark,
      '--mui-palette-divider': theme.vars.palette.schemes[paletteColor].primary.contrastText,

      '[stroke]': {
        stroke: 'var(--mui-palette-text-primary) !important'
      },

      '.tarealty-logo-text [fill]': {
        fill: 'var(--mui-palette-text-primary) !important'
      },

      // Theme colors
      '--variant-highlight-color': theme.vars.palette.schemes[paletteColor].highlightColor,
      '--mui-palette-text-primary-header': theme.vars.palette.schemes[paletteColor].headerColor,
      '--mui-palette-text-primary-overlay': theme.vars.palette.schemes[paletteColor].overlayText,

      '& *': { borderColor: theme.vars.palette.schemes[paletteColor].primary.contrastText }
    };
  }

  return styles;
};

export default applyColorScheme;
