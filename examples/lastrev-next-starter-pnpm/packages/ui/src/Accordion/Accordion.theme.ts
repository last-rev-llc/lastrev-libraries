import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Accordion'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Accordion'] = {
  root: () => ({}),

  title: ({}) => ({}),

  accordionSummary: ({}) => ({}),

  accordionDegtails: ({}) => ({})
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme): ComponentsVariants['Accordion'] => [
  //   {
  //     props: {
  //       variant: 'default'
  //     },
  //     // @ts-ignore: TODO
  //     style: () => ({
  //     })
  //   },
];

export const accordionTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Accordion: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default accordionTheme;
