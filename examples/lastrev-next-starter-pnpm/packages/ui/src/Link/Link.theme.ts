import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import { LinkVariants } from './Link.types';

const defaultProps: ComponentsProps['Link'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Link'] = {
  root: ({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    textUnderlineOffset: '4px',
    marginBottom: 0
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
      textDecoration: 'none'
    }
  },
  {
    props: {
      variant: LinkVariants.text
    },
    style: {
      textDecoration: 'none'
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
