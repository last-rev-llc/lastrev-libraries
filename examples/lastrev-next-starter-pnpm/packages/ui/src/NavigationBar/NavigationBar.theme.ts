import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['NavigationBar'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['NavigationBar'] = {
  root: {
    '& .MuiLink-root': {
      'textDecoration': 'none',
      '&.MuiLink-selected': { fontWeight: 'bold' }
    }
  }
};

const createVariants = (_theme: Theme): ComponentsVariants['NavigationBar'] => [
  {
    props: {
      variant: 'default'
    },
    style: () => ({
      backgroundColor: 'transparent'
    })
  }
];

export const navigationBarTheme = (theme: Theme): ThemeOptions => ({
  components: {
    NavigationBar: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default navigationBarTheme;
