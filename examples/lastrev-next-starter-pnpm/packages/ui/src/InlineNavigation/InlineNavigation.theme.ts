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
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['InlineNavigation'] => [];

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
