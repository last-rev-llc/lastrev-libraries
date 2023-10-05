import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import { AccordionVariants } from './Accordion.types';

const defaultProps: ComponentsProps['Accordion'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Accordion'] = {
  // root: : {},
  // contentGrid: {},
  // introTextGrid: {},
  // introText: {},
  // accordionItem: {},
  // summaryWrap: {},
  // summary: {},
  // detailsWrap: {},
  // details: {},
};

const createVariants = (_theme: Theme): ComponentsVariants['Accordion'] => [
  {
    props: {
      variant: AccordionVariants.default
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
