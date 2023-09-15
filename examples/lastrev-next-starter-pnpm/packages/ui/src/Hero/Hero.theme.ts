import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

export const defaultProps: ComponentsProps['Hero'] = {
  contentWidth: 'xl',
  disableGutters: false
};

export const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  // Set some static styles
  // root: {
  //   backgroundColor: 'red'
  // }
  //
  // Use the ownerState to set dynamic styles
  // root: ({ ownerState, theme }) => {
  //   return {
  //     backgroundColor: ownerState.variant === 'example' ? 'red' : theme.palette.background.paper
  //   };
  // }
};

const createVariants = (_theme: Theme): ComponentsVariants['Hero'] => [
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
    Hero: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
