import { Theme } from '@mui/material/styles';
import get from 'lodash/get';

export const backgroundColor = ({ backgroundColor, theme }: { backgroundColor?: string; theme: Theme }) => {
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

export default backgroundColor;
