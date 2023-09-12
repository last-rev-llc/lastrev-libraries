import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['FooterNavigationItem'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['FooterNavigationItem'] = {
  root: ({ theme, ownerState }) => ({
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    ...theme.typography.body2,
    ...(ownerState?.variant === 'linkBoldedFooter' && {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600
    })
  }),
  tag: ({ theme }) => ({
    marginLeft: theme.spacing(0.5)
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['FooterNavigationItem'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    FooterNavigationItem: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
