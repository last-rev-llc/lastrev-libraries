import { type Theme } from '@mui/system';
import { type CSSProperties } from '@mui/material/styles/createMixins';
import { alpha } from '@mui/material/styles';
import get from '../../utils/get';

type ApplyBackgroundOverlay = (args: { theme: Theme; ownerState: any }) => CSSProperties;

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    applyBackgroundOverlay: ApplyBackgroundOverlay;
  }
}

export const applyBackgroundOverlay: ApplyBackgroundOverlay = ({
  ownerState,
  theme
}: {
  ownerState?: any;
  theme: Theme;
}) => {
  if (!ownerState?.backgroundColor) return {};

  const backgroundColor: string = ownerState?.backgroundColor as any;
  let styles = {};
  if (backgroundColor?.includes('gradient') && get(theme.palette, backgroundColor)) {
    styles = {
      background: get(theme.palette, `${backgroundColor}.main`),
      color: get(theme.palette, `${backgroundColor}.contrastText`)
    };
  } else {
    const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
    const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

    if (backgroundColor && get(theme.palette, parsedBGColor)) {
      const textColor = get(theme.palette, `${paletteColor}.overlayText`);
      const bgColor = get(theme.palette, `${paletteColor}.overlay`);
      styles = {
        backgroundColor: bgColor,
        color: textColor,
        borderColor: textColor,
        fill: 'currentColor !important'
      };
    }
  }
  return styles;
};

export default applyBackgroundOverlay;
