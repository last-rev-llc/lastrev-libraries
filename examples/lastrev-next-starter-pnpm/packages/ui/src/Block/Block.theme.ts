import { Theme, ThemeOptions, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

export const defaultProps = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Block'] = {
  root: () => ({
    position: 'relative',
    overflow: 'hidden'
  }),

  introTextWrapper: ({}) => ({}),

  introText: ({}) => ({}),

  contentOuterWrapper: ({ theme, styleVariant }) => {
    const isCircleVariant = ((styleVariant || '') as string).indexOf('Circle') > -1;

    let circleCSS = {};
    if (isCircleVariant) {
      circleCSS = {};
    }

    return {
      // ...theme.mixins.gridContainer(theme),
      'gridTemplateAreas': `"${span('media', 12)}" "${span('content', 12)} "`,

      'section[id] [class*=Section-gridItem]:not(:only-child) &': {
        padding: 0
      },
      ...circleCSS
    };
  },

  content: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start'
    }
  }),

  contentWrapper: () => ({
    gridArea: 'content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }),

  eyebrow: ({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginLeft: theme.spacing(3.25)
    }
  }),

  title: ({ theme }) => ({
    ...theme.typography.h3,
    textAlign: 'center',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      ...theme.typography.h2,
      fontWeight: 900,
      textAlign: 'left'
    }
  }),

  subtitle: ({ theme }) => ({
    ...theme.typography.h4,

    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      ...theme.typography.h3,
      fontWeight: 400,
      textAlign: 'left'
    }
  }),

  body: ({ theme }) => ({
    'textAlign': 'center',

    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    },

    '& > [class*=Text-root] > *:not(:first-child)': {
      '&:not(:is(ul, ol, li))': {
        marginTop: '1em',
        marginBottom: '2em'
      },

      '&:is(ul, ol)': {
        marginTop: '-1em',
        marginBottom: '3em'
      }
    },

    '& > [class*=Text-root] > *:first-child': {
      marginTop: '0'
    },

    '[class*=MuiTypography-h]': {
      marginBottom: '.5em',
      marginTop: '2em'
    }
  }),

  mediaWrapper: ({ variant }) => {
    const isCircleVariant = ((variant || '') as string).indexOf('Circle') > -1;

    let circleCSS = {};
    if (isCircleVariant) {
      circleCSS = {
        '& img': {
          borderRadius: '50%',
          border: '10px solid #00fff2 !important',
          display: 'inline-block',
          overflow: 'hidden'
        }
      };
    }

    return {
      gridArea: 'media',
      margin: 'auto',
      width: '100%',
      ...circleCSS
    };
  },

  mediaItems: ({}) => ({}),

  actionsWrapper: ({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3.25),
      justifyContent: 'flex-start'
    }
  }),

  action: () => ({})
};

const span = (str: string, columns: number) => `${str} `.repeat(columns);

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme): ComponentsVariants['Block'] => [
  {
    props: {
      variant: 'mediaOnRight'
    },
    // @ts-ignore: TODO
    style: ({ eyebrow }) => ({
      '[class*=contentOuterWrapper]': {
        gridTemplateAreas: `"${span('media', 12)} " " ${span('content', 12)}"`,

        [theme.breakpoints.up('lg')]: {
          gridTemplateAreas: `"${span('content', 6)} ${span('media', 6)}"`
        }
      }
    })
  },
  {
    props: {
      variant: 'mediaOnLeft'
    },
    style: () => ({
      '[class*=contentOuterWrapper]': {
        gridTemplateAreas: `"${span('media', 12)} " " ${span('content', 12)}"`,

        [theme.breakpoints.up('lg')]: {
          gridTemplateAreas: `"${span('media', 6)} ${span('content', 6)}"`
        }
      }
    })
  },
  {
    props: {
      variant: 'mediaBelow'
    },
    style: {
      '[class*=contentOuterWrapper]': {
        gridTemplateAreas: `". ${span('content', 10)} ." " . ${span('media', 10)} ."`
      }
    }
  },
  {
    props: {
      variant: 'mediaAbove'
    },
    style: {
      '[class*=contentOuterWrapper]': {
        gridTemplateAreas: `". ${span('media', 10)} " " ${span('content', 10)}. "`
      }
    }
  },
  {
    props: {
      variant: 'mediaCircleOnRight'
    },
    // @ts-ignore: TODO
    style: ({ eyebrow }) => ({
      '[class*=contentOuterWrapper]': {
        gridTemplateAreas: `"${span('media', 12)} " " ${span('content', 12)}"`,

        [theme.breakpoints.up('md')]: {
          gridTemplateAreas: `"${span('content', 8)} ${span('media', 4)}"`
        }

        // [theme.breakpoints.up('lg')]: {
        //   gridTemplateAreas: `"${span('content', 6)} ${span('content', 6)}"`
        // }
      }
    })
  },
  {
    props: {
      variant: 'mediaCircleOnLeft'
    },
    style: () => ({
      '[class*=contentOuterWrapper]': {
        gridTemplateAreas: `"${span('media', 12)} " " ${span('content', 12)}"`,

        [theme.breakpoints.up('md')]: {
          gridTemplateAreas: `"${span('media', 4)} ${span('content', 8)}"`
        }

        // [theme.breakpoints.up('lg')]: {
        //   gridTemplateAreas: `"${span('media', 6)} ${span('content', 6)}"`
        // }
      }
    })
  },
  {
    props: {
      variant: 'mediaCircleBelow'
    },
    style: {
      '[class*=contentOuterWrapper]': {
        gridTemplateAreas: `"${span('content', 8)} " " ${span('media', 6)}"`
      }
    }
  },
  {
    props: {
      variant: 'mediaCircleAbove'
    },
    style: {
      '[class*=contentOuterWrapper]': {
        gridTemplateAreas: `"${span('media', 6)} " "  ${span('media', 8)}"`
      }
    }
  }
];

export const blockTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Block: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default blockTheme;
