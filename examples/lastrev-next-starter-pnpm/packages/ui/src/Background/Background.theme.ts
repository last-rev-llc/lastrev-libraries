import type { ThemeOptions, ComponentsProps, ComponentsOverrides } from '@mui/material/styles';
import { type Theme } from '../ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Background'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Background'] = {
  root: ({ theme, ownerState }) => ({
    // ...theme.mixins.applyColorScheme({ ownerState, theme }),
    'backgroundColor': 'inherit',
    'zIndex': -1,
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    'width': '100%',
    'height': '100%',

    ...(!!ownerState.overlap && {
      '&::before': {
        content: '""',
        position: 'absolute',
        width: 'calc(var(--grid-gap) + (var(--grid-margin) / 2))',
        height: 'calc(1.25 * var(--grid-margin))',
        left: 0,
        top: 'calc(-1.25 * var(--grid-margin))',
        background: 'inherit',
        zIndex: 20
      },

      '&::after': {
        content: '""',
        position: 'absolute',
        width: 'calc(var(--grid-gap) + (var(--grid-margin) / 2))',
        height: 'calc(1.25 * var(--grid-margin))',
        right: 0,
        top: 'calc(-1.25 * var(--grid-margin))',
        background: 'inherit',
        zIndex: 20
      }
    }),

    '> *': {
      'gridColumn': '1/-1',
      'height': '100%',
      'width': '100%',
      '&:is(img)': {
        objectFit: 'cover',
        objectPosition: ' center center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        transform: 'translate(-50%, -50%)'
      }
    }
  })
};

export const backgroundTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Background: {
      defaultProps,
      styleOverrides
    }
  }
});

export default backgroundTheme;
