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
  if (backgroundColor?.toLowerCase()?.includes('gradient') && get(theme.palette, backgroundColor)) {
    styles = {
      background: get(theme.palette, `${backgroundColor}.main`),
      color: get(theme.palette, `${backgroundColor}.contrastText`)
    };
  } else {
    const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
    const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

    if (backgroundColor && get(theme.palette, parsedBGColor)) {
      const textColor = get(theme.palette, `${paletteColor}.contrastText`) ?? 'currentColor';
      const bgColor = get(theme.palette, parsedBGColor);
      styles = {
        'backgroundColor': bgColor,
        'color': textColor,
        'borderColor': textColor,
        'fill': 'currentColor !important',
        '--current-color-text': textColor,
        '--current-color-bg': bgColor
      };
    }
  }
  // console.log({ backgroundColor });
  return styles;
};

export default applyBackgroundColor;
