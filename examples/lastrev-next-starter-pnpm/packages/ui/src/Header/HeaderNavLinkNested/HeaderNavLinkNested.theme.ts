import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['HeaderNavLinkNested'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['HeaderNavLinkNested'] = {
  root: () => ({}),

  navItemLink: ({ theme }) => ({
    ...theme.typography.body2,
    'padding': theme.spacing(0.625, 1),
    'marginLeft': theme.spacing(-3), // Offsets hover padding background
    'cursor': 'pointer',

    '.MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
      width: 'auto',
      height: '14px',
      paddingLeft: theme.spacing(0.625)
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['HeaderNavLinkNested'] => [];

export const headerNavLinkNestedTheme = (theme: Theme): ThemeOptions => ({
  components: {
    HeaderNavLinkNested: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default headerNavLinkNestedTheme;
