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
    lightGray?: MuiPalette['primary'];
    darkGray?: MuiPalette['primary'];
    navy?: MuiPalette['primary'];
    burgandy?: MuiPalette['primary'];
    crimson?: MuiPalette['primary'];
    sanJuan?: MuiPalette['primary'];
    cornflower?: MuiPalette['primary'];
    bordeaux?: MuiPalette['primary'];
    cucumber?: MuiPalette['primary'];
    texasRose?: MuiPalette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    transparentLight?: PaletteOptions['primary'];
    transparentDark?: PaletteOptions['primary'];
    lightGray?: PaletteOptions['primary'];
    darkGray?: PaletteOptions['primary'];
    navy?: PaletteOptions['primary'];
    burgandy?: PaletteOptions['primary'];
    crimson?: PaletteOptions['primary'];
    sanJuan?: PaletteOptions['primary'];
    cornflower?: PaletteOptions['primary'];
    bordeaux?: PaletteOptions['primary'];
    cucumber?: PaletteOptions['primary'];
    texasRose?: PaletteOptions['primary'];
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
    display3: TypographyStyle;
    bodyXSmall: TypographyStyle;
    bodySmall: TypographyStyle;
    bodyLarge: TypographyStyle;
    bodySpectral: TypographyStyle;
    navLink: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    display1?: TypographyStyle;
    display2?: TypographyStyle;
    display3?: TypographyStyle;
    bodyXSmall?: TypographyStyle;
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
    bodySpectral?: TypographyStyle;
    navLink?: TypographyStyle;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1?: true;
    display2?: true;
    display3?: true;
    bodyXSmall?: true;
    bodySmall?: true;
    bodyLarge?: true;
    bodySpectral?: true;
    navLink?: true;
  }
  type TypographyOptions = {
    display1?: TypographyStyle;
    display2?: TypographyStyle;
    display3?: TypographyStyle;
    bodyXSmall?: TypographyStyle;
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
    bodySpectral?: TypographyStyle;
    navLink?: TypographyStyle;
  };
}
