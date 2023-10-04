import { type Theme } from '@mui/system';
import { type CSSProperties } from '@mui/material/styles/createMixins';
import get from '../../utils/get';

type ApplyBackgroundColor = (args: { theme: Theme; ownerState: any }) => CSSProperties;

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    applyBackgroundColor: ApplyBackgroundColor;
  }
}

export const applyBackgroundColor: ApplyBackgroundColor = ({
  ownerState,
  theme
}: {
  ownerState?: any;
  theme: Theme;
}) => {
  if (!ownerState?.backgroundColor) return {};

  const backgroundColor: string = ownerState?.backgroundColor as any;
  let styles = {};
  if (backgroundColor?.toLowerCase()?.includes('gradient') && get(theme.vars.palette, backgroundColor)) {
    styles = {
      background: get(theme.vars.palette, `${backgroundColor}.main`),
      color: get(theme.vars.palette, `${backgroundColor}.contrastText`)
    };
  } else {
    const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

    if (backgroundColor && theme.vars.palette.schemes[paletteColor]) {
      styles = {
        'backgroundColor': theme.vars.palette.schemes[paletteColor].primary.main,
        'color': theme.vars.palette.text.primary,
        '--mui-palette-text-primary': theme.vars.palette.schemes[paletteColor].primary.contrastText,
        '--mui-palette-primary-light': theme.vars.palette.schemes[paletteColor].secondary.light,
        '--mui-palette-primary-main': theme.vars.palette.schemes[paletteColor].secondary.main,
        '--mui-palette-primary-contrastText': theme.vars.palette.schemes[paletteColor].secondary.contrastText,
        '--mui-palette-primary-dark': theme.vars.palette.schemes[paletteColor].secondary.dark,
        '--variant-highlight-color': theme.vars.palette.schemes[paletteColor].highlightColor,
        '--current-color-text': theme.vars.palette.schemes[paletteColor].primary.contrastText,
        '--current-color-bg': theme.vars.palette.schemes[paletteColor].primary.main
        // '--mui-palette-primary-main': `var(--mui-palette-${paletteColor}-accent)`
      };
    }
  }
  // console.log({ backgroundColor });
  return styles;
};

export default applyBackgroundColor;
