import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Person'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Person'] = {
  // root: {},

  contentOuterGrid: () => ({
    '> *': {
      gridColumnStart: 'auto'
    }
  }),

  headerWrap: {
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  },

  breadcrumbsWrap: {
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  },

  contentWrap: {
    display: 'contents'
  },

  // mainImage: : {},

  mainImageWrap: {
    gridColumnStart: 'three-start',
    gridColumnEnd: 'ten-end'
  },

  name: ({ theme }) => ({
    ...theme.typography.display3
  }),

  body: {
    '& > *:not(div)': {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'ten-end'
    },

    '& > div': {
      gridColumnStart: 'full-start',
      gridColumnEnd: 'full-end'
    }
  }
  // jobTitle: {},
  // email: {}
};

const createVariants = (_theme: Theme): ComponentsVariants['Person'] => [];

export const personTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Person: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default personTheme;
