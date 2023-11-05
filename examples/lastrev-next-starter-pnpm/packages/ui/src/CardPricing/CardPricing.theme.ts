import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { CardPricingVariants } from './CardPricing.types';

const defaultProps: ComponentsProps['CardPricing'] = {};

const styleOverrides: ComponentsOverrides<Theme>['CardPricing'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size'
  }),

  cardPricingWrap: ({ theme, ownerState }) => ({
    background: theme.vars.palette.primary.main,
    color: theme.vars.palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(1),
    alignItems: 'center',
    minHeight: 240,
    padding: theme.spacing(6, 7)
  }),

  contentWrap: ({ ownerState, theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(6, 7),
    gap: theme.spacing(3)
  }),

  price: ({ ownerState, theme }) => ({ margin: 0 }),
  overline: ({ ownerState, theme }) => ({ margin: 0 }),
  textBelowPrice: ({ ownerState, theme }) => ({ margin: 0 }),
  actionsWrap: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    gap: theme.spacing(2)
  })
};

const createVariants = (theme: Theme): ComponentsVariants['CardPricing'] => [];

export const cardTheme = (theme: Theme): ThemeOptions => ({
  components: {
    CardPricing: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default cardTheme;
