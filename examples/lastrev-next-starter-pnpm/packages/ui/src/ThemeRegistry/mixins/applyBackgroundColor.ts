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
  const backgroundColor: string = ownerState?.backgroundColor as any;

  if (backgroundColor?.includes('gradient') && theme.palette?.[backgroundColor]) {
    return {
      background: theme.palette?.[backgroundColor]?.main,
      color: `${backgroundColor}.contrastText`
    };
  }

  const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
  const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

  if (backgroundColor && theme.palette?.[parsedBGColor]) {
    return {
      bgcolor: parsedBGColor,
      color: `${paletteColor}.contrastText`
    };
  }
  return {};
};

export default applyBackgroundColor;
