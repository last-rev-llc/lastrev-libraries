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
    'width': '100%',
    'height': '100%',
    '> *': {
      'gridColumn': '1/-1',
      'height': '100%',
      '&:is(img)': {
        objectFit: 'cover'
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
