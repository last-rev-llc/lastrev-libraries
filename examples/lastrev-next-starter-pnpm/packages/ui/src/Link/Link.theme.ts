import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Link'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Link'] = {
  root: ({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center'
  }),

  rootButton: {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 600
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
      textDecoration: 'none'
    }
  },
  {
    props: {
      variant: 'default'
    },
    style: {
      textDecoration: 'none'
    }
  },
  {
    props: {
      variant: 'text'
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
