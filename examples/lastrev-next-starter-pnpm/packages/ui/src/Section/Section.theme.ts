import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import { SectionVariants } from './Section.types';

const defaultProps: ComponentsProps['Section'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Section'] = {
  root: {
    'containerType': 'inline-size',
    'width': '100%',
    'position': 'relative',

    'main > &:last-of-type': {
      marginBottom: 0
    }
  },

  contentOuterGrid: {
    gridColumn: 'full-start/full-end',
    gridRow: '1/-1'
  },

  contentWrap: {
    zIndex: 2,
    gridColumn: 'full-start/full-end',
    gridRow: 1
  },

  introTextGrid: { gridColumn: 'content-start/content-end' },

  // introText: { },

  itemsGrid: ({ theme, ownerState }) => {
    return {
      gridColumn: 'full-start/full-end',
      display: 'grid',
      gridGap: 'inherit',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

      ...((ownerState?.variant === SectionVariants.twoPerRow ||
        ownerState?.variant === SectionVariants.threePerRow) && {
        [theme.containerBreakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        }
      }),

      ...(ownerState?.variant === SectionVariants.threePerRow && {
        [theme.containerBreakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
        }
      })
    };
  },

  sectionItem: ({ theme, ownerState }) => ({})
};

const createVariants = (theme: Theme): ComponentsVariants['Section'] => [];

export const sectionTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Section: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default sectionTheme;
