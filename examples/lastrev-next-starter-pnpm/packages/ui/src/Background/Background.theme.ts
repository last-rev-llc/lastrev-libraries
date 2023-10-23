import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Background'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Background'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'zIndex': -1,
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    // 'overflow': 'hidden',
    'width': '100%',
    'height': '100%',

    ...(!!ownerState.overlap && {
      '&::before': {
        content: '""',
        position: 'absolute',
        width: 'var(--grid-margin)',
        height: 'calc(2 * var(--section-padding))',
        left: 0,
        top: 'calc(-2 * var(--section-padding))',
        background: 'inherit',
        zIndex: 20
      },

      '&::after': {
        content: '""',
        position: 'absolute',
        width: 'var(--grid-margin)',
        height: 'calc(2 * var(--section-padding))',
        right: 0,
        top: 'calc(-2 * var(--section-padding))',
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
