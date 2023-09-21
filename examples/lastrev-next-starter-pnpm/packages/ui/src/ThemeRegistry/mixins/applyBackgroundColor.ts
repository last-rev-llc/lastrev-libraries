import { Theme } from '@mui/material/styles';
import { CSSProperties } from '@mui/material/styles/createMixins';
import get from 'lodash/get';
type ApplyBackgroundColor = (args: { theme: Theme; ownerState: any }) => CSSProperties;
declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    applyBackgroundColor: ApplyBackgroundColor;
  }
}
export const applyBackgroundColor: ApplyBackgroundColor = ({ ownerState, theme }) => {
  const backgroundColor = ownerState?.backgroundColor as string | undefined;
  if (backgroundColor?.includes('gradient') && get(theme.palette, backgroundColor)) {
    return {
      background: get(theme.palette, backgroundColor)?.main,
      color: `${backgroundColor}.contrastText`
    };
  }
  const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
  const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

  if (backgroundColor && get(theme.palette, parsedBGColor)) {
    return {
      backgroundColor: get(theme.palette, parsedBGColor),
      color: get(theme.palette, `${paletteColor}.contrastText`)
    };
  }
  return {};
};

export default applyBackgroundColor;
