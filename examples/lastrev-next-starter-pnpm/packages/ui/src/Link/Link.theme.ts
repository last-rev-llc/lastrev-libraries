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
    })
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
      variant: 'text'
    },
    style: {
      textDecoration: 'underline'
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
