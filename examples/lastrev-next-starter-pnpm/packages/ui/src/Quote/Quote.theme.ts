import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Quote'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Quote'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    height: '100%'
  }),

  contentOuterGrid: ({ theme }) => ({
    height: '100%',
    alignItems: 'center',
    gridRowGap: theme.spacing(5)
  }),

  actionsWrap: ({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center'
  }),

  quoteText: ({ theme }) => ({
    gridRow: 1,
    gridColumn: 'content-start/content-end',
    textAlign: 'center',
    ...theme.typography.h3,

    [theme.containerBreakpoints.up('sm')]: {
      gridColumn: 'content-start/content-end'
    }
  }),

  // quoteSymbol: : {},

  authorRoot: ({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(3)
    // alignItems: 'center',
    // display: 'grid',
    // gridColumnGap: theme.spacing(3)
    // gridTemplateColumns: '1fr 1fr',
    // gridTemplateAreas: `
    //     "image authorName"
    //     "image authorTitle"
    // `
  }),

  image: ({ theme }) => ({
    width: 56,
    height: 56,
    borderRadius: '50%'
    // gridArea: 'image',
    // justifySelf: 'end'
  }),

  authorName: ({ theme }) => ({
    gridArea: 'authorName',
    fontWeight: 'bold'
  }),

  authorTitle: ({ theme }) => ({
    gridArea: 'authorTitle'
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Quote'] => [];

export const quoteTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Quote: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default quoteTheme;
