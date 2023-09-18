import { Mixins } from '@mui/material/styles/createMixins';
import { TypographyStyle, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true; // adds the `xxl` breakpoint
  }
  interface Theme {
    mixins: Mixins;
  }

  interface TypographyVariants {
    bodySmall: TypographyStyle;
    bodyLarge: TypographyStyle;
    display1: TypographyStyle;
    display2: TypographyStyle;
    display3: TypographyStyle;
    display4: TypographyStyle;
    display5: TypographyStyle;
    display6: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
    display1?: TypographyStyle;
    display2?: TypographyStyle;
    display3?: TypographyStyle;
    display4?: TypographyStyle;
    display5?: TypographyStyle;
    display6?: TypographyStyle;
  }
}

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    gridContainer: (theme: Theme, options?: any) => CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true;
    bodyLarge: true;
  }
  type TypographyOptions = {
    display1: TypographyStyle;
  };
}
