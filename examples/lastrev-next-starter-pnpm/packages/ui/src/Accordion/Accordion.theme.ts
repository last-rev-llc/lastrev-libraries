import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Accordion'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Accordion'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }),

  introText: { gridColumn: 'start / end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'start',
      gridColumnEnd: 'end'
    },
    'gridGap': 0
  }
};

const createVariants = (_theme: Theme): ComponentsVariants['Accordion'] => [];

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
