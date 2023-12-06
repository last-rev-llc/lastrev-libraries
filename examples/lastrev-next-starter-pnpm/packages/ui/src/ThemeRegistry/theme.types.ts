import {
  type Breakpoints,
  type Mixins,
  type CssVarsTheme,
  type Theme as MUITheme,
  type TypographyStyle,
  type ThemeVars
} from '@mui/material/styles';

import { type Palette, type PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface TypeBackground {
    default: string;
    paper: string;
    contrastText: string;
  }

  interface Palette {
    linkColor: string;
    headerColor: string;
    textColor: string;
    overlay: string;
    overlayText: string;
  }

  interface ExtendedPalette extends Palette {
    schemes: Palette[];
  }

  interface ExtendedCssVarsTheme extends CssVarsTheme {
    vars: {
      palette: ExtendedPalette;
    };
  }

  interface BreakpointOverrides {
    xxl: true; // adds the `xxl` breakpoint
  }

  interface Theme {
    mixins: Mixins;
    containerBreakpoints: Breakpoints;
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
    navLink: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    display1?: TypographyStyle;
    display2?: TypographyStyle;
    display3?: TypographyStyle;
    bodyXSmall?: TypographyStyle;
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
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
    navLink?: true;
  }
  type TypographyOptions = {
    display1?: TypographyStyle;
    display2?: TypographyStyle;
    display3?: TypographyStyle;
    bodyXSmall?: TypographyStyle;
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
    navLink?: TypographyStyle;
  };
}

export type Theme = Omit<MUITheme, 'palette'> & ExtendedCssVarsTheme;
