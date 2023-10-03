import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Media'] = {
  nextImageOptimization: true,
  priority: false,
  // All images are shown close to full bleed size
  sizes: '100vw'
};

const styleOverrides: ComponentsOverrides<Theme>['Media'] = {
  // Set some static styles
  root: () => ({
    // img default display: inline introduces a line-height space at the bottom
    display: 'block',
    maxWidth: `100%`,
    margin: 'auto',

    height: 'auto'
  })
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

const createVariants = (_theme: Theme): ComponentsVariants['Media'] => [
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
    Media: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
