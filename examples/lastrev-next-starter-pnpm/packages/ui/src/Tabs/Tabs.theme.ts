import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Tabs'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Tabs'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    'backgroundColor': 'none',
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',
    'padding': `var(--section-padding) 0`,
    '.MuiTabs-flexContainer': {
      gap: theme.spacing(0.5)
    },
    '.MuiTabs-indicator': {
      display: 'none'
    },
    '.MuiTab-root': {
      'flex': 1,
      'backgroundColor': theme.vars.palette.background.lightTwo,
      'color': theme.vars.palette.text.primary,
      'borderRadius': '8px 8px 0 0',
      '&.Mui-selected': {}
    },

    '.Mui-selected': {
      opacity: 1,
      fontWeight: 700,
      color: 'currentColor',
      backgroundColor: theme.vars.palette.background.tab
    }
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },
  tabsWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius
  }),
  // tabsContext: {},
  tabListWrap: ({ theme }) => ({
    // 'gridColumnStart': 'content-start',
    // 'gridColumnEnd': 'content-end',
  }),

  detailsWrap: ({ theme }) => ({
    'backgroundColor': theme.vars.palette.background.tab,
    'display': 'block!important',
    'gridColumnStart': 'content-start',
    'gridColumnEnd': 'content-end',
    'padding': theme.spacing(6, 10),
    '&[hidden]': {
      visibility: 'hidden',
      position: 'absolute'
    }
  })
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
