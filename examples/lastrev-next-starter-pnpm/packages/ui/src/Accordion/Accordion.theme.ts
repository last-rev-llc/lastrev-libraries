import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { AccordionVariants } from './Accordion.types';

const defaultProps: ComponentsProps['Accordion'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Accordion'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',
    'boxShadow': 'none',
    '&.Mui-expanded': {
      '> .MuiAccordionSummary-root': {
        minHeight: '48px'
      }
    }
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end'
    },

    'gridGap': 16
    // 'display': 'contents'
  },
  accordionItem: ({ theme }) => ({
    'boxShadow': 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  }),
  summaryWrap: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)'
  },
  // summary: {},
  detailsWrap: ({ theme }) => ({
    background: theme.vars.palette.background.lightThree,
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
    padding: theme.spacing(2)
  })
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
