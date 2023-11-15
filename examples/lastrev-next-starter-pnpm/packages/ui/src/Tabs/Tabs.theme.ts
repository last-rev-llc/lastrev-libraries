import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Tabs'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Tabs'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: `var(--section-padding) 0`
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  // tabsContext: {},
  tabListWrap: ({ theme }) => ({
    'gridColumnStart': 'content-start',
    'gridColumnEnd': 'content-end',
    '.MuiTabs-flexContainer': { gap: 'var(--grid-gap)' },

    '.MuiTab-root': {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      paddingRight: 'var(--grid-gap-double)',
      paddingLeft: 0,
      whiteSpace: 'nowrap',
      opacity: 0.3,
      textTransform: 'unset',
      ...theme.typography.h5
    },

    '.Mui-selected': {
      opacity: 1,
      color: 'var(--mui-palette-text-primary)'
    }
  }),

  detailsWrap: {
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    padding: 0
  }
  // details: {}
};

const createVariants = (theme: Theme): ComponentsVariants['Tabs'] => [];

export const TabsTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Tabs: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default TabsTheme;
