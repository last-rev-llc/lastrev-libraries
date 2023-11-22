import { type Theme } from '@mui/system';
import { type CSSProperties } from '@mui/material/styles/createMixins';
import get from '../../utils/get';

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
      '--current-color-main': theme.vars.palette.schemes[paletteColor].primary.main,
      '--mui-palette-background-tab': theme.vars.palette.schemes[paletteColor].primary.main,
      '--mui-palette-overline': theme.vars.palette.schemes[paletteColor].overline,
      '--mui-palette-cardBackground': theme.vars.palette.schemes[paletteColor].cardBackground,
      '--mui-palette-accordion-summary': theme.vars.palette.schemes[paletteColor].accordionSummary,
      // '--swiper-theme-color': theme.vars.palette.schemes[paletteColor].overline,
      '*': {
        // Color inversion
        '--mui-palette-text-primary': theme.vars.palette.schemes[paletteColor].primary.contrastText,
        '--mui-palette-background-paper': theme.vars.palette.schemes[paletteColor].dark,
        // TODO: Everything should be using the above variable for color, so below is not needed
        // 'color': theme.vars.palette.schemes[paletteColor].primary.contrastText,

        '--swiper-theme-color': theme.vars.palette.schemes[paletteColor].secondary.main,
        '--mui-palette-primary-light': theme.vars.palette.schemes[paletteColor].secondary.light,
        '--mui-palette-primary-main': theme.vars.palette.schemes[paletteColor].secondary.main,
        '--mui-palette-primary-contrastText': theme.vars.palette.schemes[paletteColor].secondary.contrastText,
        '--mui-palette-primary-dark': theme.vars.palette.schemes[paletteColor].secondary.dark,

        '--mui-palette-secondary-light': theme.vars.palette.schemes[paletteColor].primary.light,
        '--mui-palette-secondary-main': theme.vars.palette.schemes[paletteColor].primary.main,
        '--mui-palette-secondary-contrastText': theme.vars.palette.schemes[paletteColor].primary.contrastText,
        '--mui-palette-secondary-dark': theme.vars.palette.schemes[paletteColor].primary.dark,
        '--mui-palette-divider': theme.vars.palette.schemes[paletteColor].primary.contrastText,
        // Theme colors
        '--variant-highlight-color': theme.vars.palette.schemes[paletteColor].highlightColor,
        '--variant-accordion-color': theme.vars.palette.schemes[paletteColor].highlightColor,
        '--current-color-text': theme.vars.palette.schemes[paletteColor].primary.main,
        '--current-color-bg': theme.vars.palette.schemes[paletteColor].primary.main
        // '--mui-palette-primary-main': `var(--mui-palette-${paletteColor}-accent)`
      }
    };
  }

  // console.log({ backgroundColor });
  return styles;
};

export default applyColorScheme;
