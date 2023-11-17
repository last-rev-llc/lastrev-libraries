import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { LinkVariants } from './Link.types';

const defaultProps: ComponentsProps['Link'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Link'] = {
  root: ({ ownerState, theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    textUnderlineOffset: '4px',
    marginBottom: 0,
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

const createVariants = (theme: Theme): ComponentsVariants['Link'] => [
  {
    props: {
      variant: LinkVariants.link
    },
    style: {
      '&:not(:hover)': { textDecoration: 'none' },
      '&.MuiLink-selected': {
        textDecoration: 'underline'
      }
    }
  },

  {
    props: {
      variant: LinkVariants.buttonText
    },
    style: {
      'paddingLeft': 0,
      'alignSelf': 'flex-start',
      ...theme.typography.h6,
      'margin': 0,
      'paddingBottom': 0,

      '.MuiButton-startIcon ': {
        marginLeft: 0
      }
    }
  },

  {
    props: {
      variant: LinkVariants.default
    },
    style: {
      textDecoration: 'underline'
    }
  },
  {
    props: {
      variant: LinkVariants.text
    },
    style: {
      textDecoration: 'underline'
    }
  },
  {
    props: {
      variant: 'footerContactDetailsFooter'
    },
    style: {
      'textDecoration': 'underline',
      '&&': {
        whiteSpace: 'pre'
      }
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
