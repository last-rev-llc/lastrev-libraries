import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

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

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: ({ theme, ownerState }) => ({
    gridColumn: 'full-start/full-end',
    gridRow: '1/-1',

    ...((ownerState?.variant === SectionVariants.twoPerRow || ownerState?.variant === SectionVariants.threePerRow) && {
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
    })
  }),

  contentWrap: ({ theme, ownerState }) => ({
    zIndex: 2,
    gridColumn: 'content-start/content-end'
    // 'gridRow': 1,

    // TEST TO let children blocks flow with main section grid
    // 'display': 'contents',

    // '& > *': {
    //   gridColumn: 'unset',
    //   gridRow: 'auto'
    //   // ...((ownerState?.variant === SectionVariants.twoPerRow ||
    //   //   ownerState?.variant === SectionVariants.threePerRow) && {
    //   //   [theme.containerBreakpoints.up('md')]: {
    //   //     gridColumn: `span var(--num-columns-md)`
    //   //   }
    //   // }),
    //   // ...(ownerState?.variant === SectionVariants.threePerRow && {
    //   //   [theme.containerBreakpoints.up('lg')]: {
    //   //     gridColumn: `span var(--num-columns-lg)`
    //   //   }
    //   // })
    // }
  }),

  introTextGrid: { gridColumn: 'content-start/content-end' },

  // introText: { },

  itemsGrid: ({ theme, ownerState }) => {
    return {
      // gridColumn: 'full-start/full-end',
      display: 'grid',
      gridGap: 'inherit',
      gridRowGap: 0,
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
