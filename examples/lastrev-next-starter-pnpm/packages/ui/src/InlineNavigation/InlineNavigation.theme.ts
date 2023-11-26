import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['InlineNavigation'] = {};

const styleOverrides: ComponentsOverrides<Theme>['InlineNavigation'] = {
  root: ({ ownerState, theme }) => ({
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.vars.palette.background.lightOne}`,
    // borderTop: `1px solid ${theme.vars.palette.background.lightOne}`,
    transition: '.25 ease-in-out',

    backgroundColor: theme.vars.palette.white.main,
    zIndex: 1100,
    top: 88,
    position: 'sticky',
    ...(ownerState.trigger ? {} : {})
  }),
  linksWrap: ({ ownerState, theme }) => ({
    // padding: '8px 16px',
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(3)
  }),
  link: ({ ownerState, theme }) => ({
    // padding: theme.spacing(1, 2)
    ...(ownerState?.active
      ? {
          color: theme.vars.palette.primary.main
        }
      : null)
  })
};

const createVariants = (theme: Theme): ComponentsVariants['InlineNavigation'] => [
  {
    props: { variant: 'tableOfContents' },
    style: {
      'position': 'relative',
      'top': 0,
      'backgroundColor': 'unset',
      'padding': 0,
      'border': 0,
      '&:before': {
        zIndex: '-1',
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '50%',
        background: `var(--mui-palette-prev-color)`
      },
      '[class*=link]': {
        'color': theme.vars.palette.common.black,

        '&:hover': {
          color: theme.vars.palette.primary.main
        },
        'padding': theme.spacing(2, 3)
      },
      '[class*=linksWrap]': {
        margin: 'auto',
        maxWidth: 960,
        padding: 0,
        background: theme.vars.palette.background.lightTwo,
        borderRadius: 24,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0
      }
    }
  }
];

export const InlineNavigationTheme = (theme: Theme): ThemeOptions => ({
  components: {
    InlineNavigation: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default InlineNavigationTheme;
