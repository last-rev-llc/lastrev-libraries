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
  root: ({ theme, ownerState }) => {
    const background = theme.mixins.applyBackgroundColor({ ownerState, theme });

    // const hasBackground = !!Object.keys(background).length || ownerState.background;

    return {
      ...background,
      'containerType': 'inline-size',
      'width': '100%',
      'position': 'relative',

      // 'overflow': hasBackground ? 'hidden' : 'visible',

      // TODO: Nested Sections
      // '& &': {
      //   marginTop: theme.spacing(10),
      //   marginBottom: theme.spacing(10)
      // },

      // 'main > &': {
      //   '&:first-of-type': {
      //     marginTop: 0
      //   }
      // },

      'main > &:last-of-type': {
        marginBottom: 0
      }
    };
  },

  contentOuterGrid: {
    gridColumn: 'full-start/full-end',
    gridRow: '1/-1'
  },

  contentWrap: ({ theme, ownerState }) => {
    const background = theme.mixins.applyBackgroundColor({ ownerState, theme });
    const hasBackground = !!Object.keys(background).length || ownerState.background;

    return {
      zIndex: 2,
      // 'containerType': 'inline-size',
      gridColumn: 'full-start/full-end',
      gridRow: 1
      // marginTop: hasBackground ? 0 : theme.spacing(10),
      // marginBottom: hasBackground ? 0 : theme.spacing(10),
      // paddingTop: hasBackground ? theme.spacing(10) : 0,
      // paddingBottom: hasBackground ? theme.spacing(10) : 0

      // '& > *': {
      //   zIndex: 2
      // }
    };
  },

  backgroundMediaWrap: {
    '&&': {
      gridColumn: '1/-1',
      gridRow: '1/-1',
      zIndex: 1,
      position: 'relative'
    }
  },

  backgroundMedia: {
    '&&': {
      minWidth: '100%',
      minHeight: '100%',
      objectFit: 'cover'
    }
  },

  introTextGrid: { gridColumn: 'content-start/content-end' },

  // introText: { },

  itemsGrid: ({ theme, ownerState }) => {
    return {
      gridColumn: 'full-start/full-end',
      display: 'grid',
      gridGap: 'inherit',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

      ...((ownerState.variant === SectionVariants.twoPerRow || ownerState.variant === SectionVariants.threePerRow) && {
        [theme.containerBreakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        }
      }),

      ...(ownerState.variant === SectionVariants.threePerRow && {
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
