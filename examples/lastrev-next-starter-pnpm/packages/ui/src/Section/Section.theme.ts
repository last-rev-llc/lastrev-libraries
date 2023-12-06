import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { SectionVariants } from './Section.types';

const defaultProps: ComponentsProps['Section'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Section'] = {
  root: ({ theme, ownerState }) => ({
    'containerType': 'inline-size',
    'width': '100%',
    'position': 'relative',

    'main > &:last-of-type': {
      marginBottom: 0
    },

    ...(ownerState?.prevBgColor && ownerState.inheritTopBGOverlap
      ? {
          'paddingTop': 0,
          'paddingLeft': 0,
          'paddingRight': 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            display: 'block',
            height: 'var(--section-padding)',
            width: '100%',
            ...theme.mixins.applyColorScheme({
              ownerState: { ...ownerState, backgroundColor: ownerState?.prevBgColor ?? 'navy' },
              theme
            })
          }
        }
      : { ...theme.mixins.applyColorScheme({ ownerState, theme }) })
  }),

  introText: { gridColumn: 'start / end' },

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

  contentWrap: { zIndex: 2, gridColumn: 'start/end' },

  introTextGrid: { gridColumn: 'start/end' },

  itemsGrid: ({ theme, ownerState }) => {
    return {
      zIndex: 10,
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
  }
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
