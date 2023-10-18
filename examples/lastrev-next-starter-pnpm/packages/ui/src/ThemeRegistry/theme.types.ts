import { Mixins } from '@mui/material/styles/createMixins';
import { type TypographyStyle, type Breakpoints } from '@mui/material/styles';
import { Palette as MuiPalette } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface TypeBackground {
    default: string;
    paper: string;
    contrastText: string;
  }

  interface Palette {
    tertiary?: MuiPalette['primary'];
    transparentLight?: MuiPalette['primary'];
    transparentDark?: MuiPalette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    transparentLight?: PaletteOptions['primary'];
    transparentDark?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides {
    xxl: true; // adds the `xxl` breakpoint
  }

  interface Theme {
    mixins: Mixins;
  }

  interface ThemeOptions {
    containerBreakpoints?: Breakpoints;
  }

  interface TypographyVariants {
    display1: TypographyStyle;
    display2: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    display1?: TypographyStyle;
    display2?: TypographyStyle;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodySmall?: true;
    bodyLarge?: true;
    bodySpectral?: true;
    display1?: true;
    display2?: true;
    display3?: true;
  }
  type TypographyOptions = {
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
    bodySpectral?: TypographyStyle;
    display1?: TypographyStyle;
    display2?: TypographyStyle;
    display3?: TypographyStyle;
  };
}
