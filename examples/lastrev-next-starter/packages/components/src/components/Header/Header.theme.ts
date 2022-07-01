import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Header'] = {
  color: 'secondary'
};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Header'] = {
  // Set some static styles
  contentContainer: ({ theme }) => ({
    height: '100px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10)
    }
  })
  //
  // Use the ownerState to set dynamic styles
  // root: ({ ownerState, theme }) => {
  //   return {
  //     backgroundColor: ownerState.variant === 'example' ? 'red' : theme.palette.background.paper
  //   };
  // }
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['Header'] => [
  // Use prop matching to set variant styles
  // {
  //   props: {
  //     variant: 'example'
  //   },
  //   style: {
  //     backgroundColor: theme.palette.primary.main
  //   }
  // }
  // Other props are also valid
  // {
  //   props: {
  //     backgroundColor: 'primary.main',
  //   },
  //   style: {
  //     color: theme.palette.primary.contrastText
  //   }
  // }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Header: {
      // @ts-expect-error
      height: 100,
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
