import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

export const defaultProps: ComponentsProps['Hero'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  heroRoot: ({ ownerState, theme }) => ({
    ...theme.mixins.applyBackgroundColor({ theme, ownerState }),
    position: 'relative',
    padding: theme.spacing(12, 0)
  }),
  backgroundRoot: () => ({}),
  backgroundRootContent: () => ({
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0
  }),
  contentOuterGrid: ({ theme }) => ({
    position: 'relative'
  }),
  content: () => ({}),
  mainContentWrapper: ({ theme }) => ({
    alignSelf: 'center',
    gridRow: 1,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-half',
    [theme.breakpoints.down('sm')]: {
      gridColumnEnd: 'span 4',
      gridRow: 2
    }
  }),
  overline: ({ theme }) => ({
    marginBottom: theme.spacing(1)
  }),
  title: () => ({}),
  subtitle: () => ({}),
  body: () => ({}),
  sideContentWrapper: ({ theme }) => ({
    gridColumnStart: 'content-half',
    gridColumnEnd: 'content-end',
    [theme.breakpoints.down('sm')]: {
      gridColumnStart: 'content-start'
    }
  }),

  images: () => ({}),

  actionsWrapper: ({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  }),

  action: () => ({})
};

// const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [
//   {
//     props: {
//       variant: 'mediaOnLeft'
//     },
//     style: () => ({
//       '[class*=mainContentWrapper]': {
//         gridColumn: '7/-1',
//         gridRow: 1
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '1/7',
//         gridRow: 1
//       }
//     })
//   },
//   {
//     props: {
//       variant: 'mediaOnLeftFullBleed'
//     },
//     style: () => ({
//       '[class*=mainContentWrapper]': {
//         gridColumn: '7/-1',
//         gridRow: 1
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '1/7',
//         gridRow: 1
//       }
//     })
//   },
//   {
//     props: {
//       variant: 'mediaOnRight'
//     },
//     style: () => ({
//       'border': 'solid 10px blue',
//       '[class*=mainContentWrapper]': {
//         gridColumn: '1/7',
//         gridRow: 1
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '7/-1',
//         gridRow: 1
//       }
//     })
//   },
//   {
//     props: {
//       variant: 'mediaOnRightFullBleed'
//     },
//     style: () => ({
//       '[class*=mainContentWrapper]': {
//         gridColumn: '1/7',
//         gridRow: 1
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '7/-1',
//         gridRow: 1
//       }
//     })
//   },
//   {
//     props: {
//       variant: 'mediaAbove'
//     },
//     style: {
//       '[class*=mainContentWrapper]': {
//         'gridColumn': '1/-1',
//         'gridRow': 2,
//         '& > *': {
//           textAlign: 'center',
//           display: 'block'
//         }
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '1/-1',
//         gridRow: 1
//       },

//       '[class*=actionsWrapper]': {
//         justifyContent: 'center'
//       }
//     }
//   },
//   {
//     props: {
//       variant: 'mediaBelow'
//     },
//     style: {
//       '[class*=mainContentWrapper]': {
//         'gridColumn': '1/-1',
//         'gridRow': 1,

//         '& > *': {
//           textAlign: 'center',
//           display: 'block'
//         }
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '1/-1',
//         gridRow: 2
//       },

//       '[class*=actionsWrapper]': {
//         justifyContent: 'center'
//       }
//     }
//   }
//]

const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [];

export const heroTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Hero: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default heroTheme;
