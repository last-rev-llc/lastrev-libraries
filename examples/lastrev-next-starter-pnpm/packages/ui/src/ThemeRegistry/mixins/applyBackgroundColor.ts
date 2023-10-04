import { type Theme } from '@mui/system';
import { type CSSProperties } from '@mui/material/styles/createMixins';

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

  if (backgroundColor?.includes('gradient') && theme.palette?.[backgroundColor]) {
    return {
      backgroundColor: theme.palette?.[backgroundColor]?.main,
      color: `${backgroundColor}.contrastText`
    };
  }

  // const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
  const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

  if (theme.palette?.[paletteColor]) {
    return {
      backgroundColor: theme.palette?.[paletteColor]?.main,
      color: theme.palette?.[paletteColor]?.contrastText
    };
  }
  return {};
};

export default applyBackgroundColor;
