import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { AccordionVariants } from './Accordion.types';

const defaultProps: ComponentsProps['Accordion'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Accordion'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end'
    },
    'gridGap': 0
    // 'display': 'contents'
  }
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
