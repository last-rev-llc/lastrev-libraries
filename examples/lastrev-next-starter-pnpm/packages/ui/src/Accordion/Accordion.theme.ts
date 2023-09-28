import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Accordion'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Accordion'] = {
  root: () => ({}),

  contentContainer: () => ({}),

  introTextWrapper: () => ({}),

  introText: ({}) => ({})
};

const createVariants = (_theme: Theme): ComponentsVariants['Accordion'] => [
  {
    props: {
      variant: 'default'
    },
    style: {}
  }
];

export const AccordionTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Accordion: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default AccordionTheme;
