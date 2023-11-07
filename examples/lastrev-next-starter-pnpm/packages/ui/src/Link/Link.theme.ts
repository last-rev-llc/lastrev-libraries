import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Link'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Link'] = {
  root: ({ ownerState, theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    ...(ownerState?.variant?.includes('Contained') && {
      'color': 'var(--mui-palette-primary-contrastText)',
      'backgroundColor': 'var(--mui-palette-primary-main)',
      '--mui-palette-Button-inheritContainedHoverBg': 'var(--mui-palette-primary-dark)'
    }),
    ...(ownerState?.variant?.includes('Outlined') && {
      color: 'var(--mui-palette-primary-main)',
      borderColor: 'var(--mui-palette-primary-main)'
    }),
    // TODO: Discuss but this helps to do a label
    ...(ownerState?.href !== '#'
      ? {
          textDecorationColor: 'var(--mui-palette-primary-main)'
        }
      : null),

    // TODO: Review, looks out of place but allows for any icon color controlled from Link color
    // TODO Add variant
    // TODO Really review this weird stuff, supports color inversion as well as explicit color on the link

    ...(ownerState?.icon
      ? {
          'backgroundColor': 'transparent',
          '.fill-primary': {
            fill: `var(--mui-palette-${ownerState?.color ?? 'primary'}-main)`
          },
          '.fill-secondary': {
            fill: `var(--mui-palette-${ownerState?.color ? ownerState?.color + '-contrastText' : 'secondary-main'})`
          }
        }
      : null)
  }),

  rootButton: {
    display: 'inline-flex',
    alignItems: 'center'
  },

  // rootLink: : {},

  // rootMuiLink: : {},

  // rootIconButton: : {},

  noLinkStyleIcon: ({ theme, iconPosition }) => ({
    margin: iconPosition === 'Left' ? `0 ${theme.spacing(1)} 0 0` : `0 0 0 ${theme.spacing(1)}`
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Link'] => [
  {
    props: {
      variant: 'link'
    },
    style: {
      textDecoration: 'underline'
    }
  },
  {
    props: {
      variant: 'default'
    },
    style: {
      textDecoration: 'underline'
    }
  },
  {
    props: {
      variant: 'buttonText'
    },
    style: {
      textDecoration: 'underline',
      textTransform: 'unset'
    }
  }
];

export const LinkTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Link: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default LinkTheme;
