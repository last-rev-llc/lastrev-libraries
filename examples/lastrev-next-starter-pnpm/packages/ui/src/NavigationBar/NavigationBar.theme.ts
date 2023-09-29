import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['NavigationBar'] = {};

const styleOverrides: ComponentsOverrides<Theme>['NavigationBar'] = {
  root: {
    '& .MuiLink-root': {
      '&.MuiLink-selected': { fontWeight: 900 }
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
