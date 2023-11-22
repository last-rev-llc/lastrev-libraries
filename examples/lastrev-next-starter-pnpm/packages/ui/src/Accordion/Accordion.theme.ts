import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { AccordionVariants } from './Accordion.types';

const defaultProps: ComponentsProps['Accordion'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Accordion'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
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
    },
    '[class*=MuiCollapse-wrapperInner]': {
      'position': 'relative',
      'borderRadius': '0 0 8px 8px',
      'overflow': 'hidden',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'white',
        zIndex: -1
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
    // 'background': theme.vars.palette.secondary.main,
    'background': 'transparent',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '[class*=Accordion-summary]': {
      color: 'var(--mui-palette-accordion-summary)'
    }
  }),
  summaryWrap: {
    'borderBottom': '1px solid rgba(0, 0, 0, .125)',
    'borderColor': `color-mix(in srgb, var(--variant-highlight-color), transparent 80%)`,
    '[class*=expandIconWrapper]': {
      color: 'var(--variant-highlight-color)'
    }
  },
  // summary: {},
  detailsWrap: ({ theme }) => ({
    'background': theme.vars.palette.background.lightThree,
    '.MuiTypography-root': {
      color: theme.vars.palette.common.black
    },
    'borderRadius': '0 0 8px 8px',
    'overflow': 'hidden',
    'padding': theme.spacing(2)
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
