import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['HeaderNavLinkNested'] = {};

const styleOverrides: ComponentsOverrides<Theme>['HeaderNavLinkNested'] = {
  // root: : {},

  navItemLink: ({ theme }) => ({
    // TODO: Check if this is needed
    'padding': theme.spacing(0.625, 1),
    'marginLeft': theme.spacing(-3), // Offsets hover padding background
    'cursor': 'pointer',

    // TODO: Standardizxe this across the header links if they're the same
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
