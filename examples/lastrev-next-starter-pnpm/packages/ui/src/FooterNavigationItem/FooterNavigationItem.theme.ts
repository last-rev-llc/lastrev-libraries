import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['FooterNavigationItem'] = {};

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
