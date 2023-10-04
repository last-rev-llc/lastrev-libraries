import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import type { Color } from '@mui/material';

const defaultProps: ComponentsProps['Hero'] = {
  contentWidth: 'xl',
  contentHeight: 'lg',
  disableGutters: false,
  variant: 'default'
};

const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  heroRoot: ({ ownerState, theme }) => {
    const baseStyles = {
      width: '100%',
      contentHeight: 'lg'
    };

    // Assuming ownerState has a type defined
    let bgColorStyles: React.CSSProperties = {};
    let bgColor: Partial<Color> | string | undefined = ownerState?.backgroundColor;

    if (bgColor?.includes('gradient') && bgColor) {
      // Make sure to specify the property name explicitly, as it's dynamic
      // Fix TS issues
      const themeBgColor = theme?.palette?.[bgColor]?.main;
      const themeBgColorContrastText = theme?.palette?.[bgColor]?.contrastText;

      bgColorStyles = {
        background: themeBgColor,
        color: themeBgColorContrastText
      };
    } else if (bgColor) {
      // Ensure the correct property is accessed
      const parsedBgColorString = bgColor?.includes('.') ? bgColor : theme?.palette?.[bgColor]?.main;

      const paletteColorString = bgColor?.includes('.')
        ? theme?.palette?.[bgColor.split('.')[0]]?.contrastText
        : bgColor;

      const parsedBgColor = theme?.palette?.[parsedBgColorString];

      if (parsedBgColor) {
        bgColorStyles = {
          backgroundColor: parsedBgColor.main,
          color: paletteColorString
        };
      }
    }

    return {
      ...baseStyles,
      ...bgColorStyles
    };
  },

  backgroundRoot: {
    gridColumn: '1/-1',
    gridRow: '1/-1',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },

  backgroundRootContent: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },

  contentOuterGrid: ({ theme }) => {
    return {
      ...theme.mixins.gridContainer(theme),
      alignSelf: 'center',
      justifySelf: 'center',
      position: 'relative',
      zIndex: 2
    };
  },

  content: {
    display: 'flex',
    flexDirection: 'column'
  },

  mainContentWrapper: {
    gridColumn: '1/7',
    gridRow: '1',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center'
  },

  overline: ({ theme }) => ({
    marginBottom: theme.spacing(1)
  }),

  // title: : {},

  // subtitle: : {},

  // body: : {},

  sideContentWrapper: {
    gridColumn: '7/-1',
    gridRow: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  // images: : {},

  actionsWrapper: ({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.containerBreakpoints.up('md')]: {
      flexDirection: 'row'
    }
  })

  // action: : {}
};

// const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [
//   {
//     props: {
//       variant: 'mediaOnLeft'
//     },
//     style: {
//       '[class*=mainContentWrapper]': {
//         gridColumn: '7/-1',
//         gridRow: 1
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '1/7',
//         gridRow: 1
//       }
//     }
//   },
//   {
//     props: {
//       variant: 'mediaOnLeftFullBleed'
//     },
//     style: {
//       '[class*=mainContentWrapper]': {
//         gridColumn: '7/-1',
//         gridRow: 1
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '1/7',
//         gridRow: 1
//       }
//     }
//   },
//   {
//     props: {
//       variant: 'mediaOnRight'
//     },
//     style: {
//       'border': 'solid 10px blue',
//       '[class*=mainContentWrapper]': {
//         gridColumn: '1/7',
//         gridRow: 1
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '7/-1',
//         gridRow: 1
//       }
//     }
//   },
//   {
//     props: {
//       variant: 'mediaOnRightFullBleed'
//     },
//     style: {
//       '[class*=mainContentWrapper]': {
//         gridColumn: '1/7',
//         gridRow: 1
//       },

//       '[class*=sideContentWrapper]': {
//         gridColumn: '7/-1',
//         gridRow: 1
//       }
//     }
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
