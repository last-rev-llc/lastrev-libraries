import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['HeaderNavLinkNested'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['HeaderNavLinkNested'] = {
  root: () => ({}),

  navItemLink: ({ theme }) => ({
    ...theme.typography.body2,
    'color': theme.palette.primary.contrastText,
    'padding': theme.spacing(0.625, 1),
    'marginLeft': theme.spacing(-3), // Offsets hover padding background
    'borderRadius': 0,
    'backgroundColor': 'inherit',
    'transition': 'background-color 0.25s, border-radius 1s',
    'cursor': 'pointer',
    '&:is(:hover, :focus-within):not(:focus-visible)': {
      backgroundColor: theme.palette.grey[100],
      borderRadius: theme.spacing(0.5)
    },

    '.MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
      width: 'auto',
      height: '14px',
      paddingLeft: theme.spacing(0.625)
    }
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['HeaderNavLinkNested'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    HeaderNavLinkNested: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
