import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Section'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Section'] = {
  root: ({ theme, hasBackground }) => {
    return {
      // 'marginTop': hasBackground ? 0 : theme.spacing(15),
      // 'marginBottom': hasBackground ? 0 : theme.spacing(15),
      // 'paddingTop': hasBackground ? theme.spacing(20) : 0,
      // 'paddingBottom': hasBackground ? theme.spacing(20) : 0,
      // 'overflow': hasBackground ? 'hidden' : 'visible',
      // '& &': {
      //   marginTop: theme.spacing(10),
      //   marginBottom: theme.spacing(10)
      // },
      // 'main > &': {
      //   '&:first-of-type': {
      //     marginTop: 0
      //   }
      // },
      // 'main > &:last-of-type': {
      //   marginBottom: 0
      // },
      // '& [class*=backgroundMedia]': {
      //   height: 'auto !important',
      //   width: '100% !important'
      // }
    };
  },
  contentGrid: ({ theme, ownerState }) => ({
    '> *': {
      // 'gridRow': 1,
      // '&:nth-child(1)': {
      //   gridColumnStart: 'content-start'
      // },
      // '&:nth-child(2)': {
      //   gridColumnStart: 'content-start'
      // },
      // '&:nth-child(3)': {
      //   gridColumnStart: 'content-start'
      // },
      // '&:nth-child(4)': {
      //   gridColumnStart: 'content-start'
      // },
    }
  }),
  introText: ({ theme, align }) => ({
    // 'gridColumn': '1 / span 2',
    // 'position': 'relative',
    // 'marginBottom': theme.spacing(4),
    // '[class$=Text-title]': {
    //   ...theme.typography.h4,
    //   textAlign: `${align === 'center' ? 'center' : 'left'}`
    // },
    // '[class$=Text-subtitle]': {
    //   ...theme.typography.h3,
    //   textAlign: `${align === 'center' ? 'center' : 'left'}`,
    //   marginTop: theme.spacing(2)
    // },
    // '[class$=Text-root]': {
    //   marginTop: theme.spacing(3),
    //   textAlign: `${align === 'center' ? 'center' : 'left'}`
    // },
    // [theme.breakpoints.up('md')]: {
    //   'gridColumn': '1 / span 5',
    //   ...(align === 'center' && {
    //     gridColumn: '1 / -1'
    //   }),
    //   '[class$=Text-title]': {
    //     ...theme.typography.h3
    //   },
    //   '[class$=Text-root] > *': {
    //     ...theme.typography.body2
    //   },
    //   '&::before': {
    //     width: 115
    //   }
    // },
    // [theme.breakpoints.up('md')]: {
    //   'gridColumn': '1 / span 8',
    //   ...(align === 'center' && {
    //     gridColumn: '3 / span 8'
    //   }),
    //   '[class$=Text-title]': {
    //     ...theme.typography.h2
    //   }
    // },
    // '& + [class*=contentContainer]': {
    //   marginTop: theme.spacing(4)
    // }
  }),
  //
  // Use the ownerState to set dynamic styles
  // root: ({ ownerState, theme }) => {
  //   return {
  //     backgroundColor: ownerState.variant === 'example' ? 'red' : theme.palette.background.paper
  //   };
  // }
  backgroundImage: ({}) => ({
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  })
};

const createVariants = (theme: Theme): ComponentsVariants['Section'] => [
  {
    props: { variant: 'fullBleed' },
    style: {
      '[class*=Section-contentGrid]': {
        gridColumnEnd: 'content-end'
        // ':nth-child(2n + 1)': {
        //   gridColumnStart: 'content-start'
        // },
        // ':nth-child(2n)': {
        //   gridColumnStart: 'content-half'
        // }
      }
    }
  },
  {
    props: { variant: 'onePerRow' },
    style: {
      '[class*=Section-contentGrid]': {
        display: 'block'
        // gridColumnEnd: 'content-end'
        // ':nth-child(2n + 1)': {
        //   gridColumnStart: 'content-start'
        // },
        // ':nth-child(2n)': {
        //   gridColumnStart: 'content-half'
        // }
      }
    }
  },
  {
    props: { variant: 'twoPerRow' },
    style: {
      '[class*=Section-contentGrid]': {
        '>*': {
          gridColumnEnd: 'span 6'
        },
        '>:nth-child(2n + 1)': {
          gridColumnStart: 'content-start'
        },
        '>:nth-child(2n)': {
          gridColumnStart: 'content-half'
        }
      }
    }
  }
];

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
