import { Theme } from '@mui/material/styles';

export const heightMediumHeroVariant = (theme: Theme) => ({
  props: {
    variant: 'Height - Med'
  },
  style: {
    'minHeight': 'unset',

    '&[class*="Hero-root"]': {
      paddingTop: theme.spacing(1.5)
    },

      // TODO: Create variant for centered content? (homepage)
      // '& .MuiGrid-container': {
      //   justifyContent: 'center'
      // },

      '& .MuiTypography-body1': {
        ...theme.typography.body2
      },

      '& .MuiTypography-root': {
      // TODO: Create variant for centered content? (homepage)
      // textAlign: 'center',

      '& .MuiLink-root': {
        textDecoration: 'underline',
        textDecorationColor: 'currentColor',

        '&:hover': {
          textDecoration: 'none'
        }
      }
    }
  }
});

export const heightShortHeroVariant = (theme: Theme) => ({
  props: {
    variant: 'Height - Short'
  },
  style: {
    'background': theme.palette.background.paper,
    '&[class*="Hero-root"]': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 0
    },
    '.MuiContainer-root': {
      'paddingRight': 0,
      '& > div': {
        marginTop: 0,
        marginLeft: 0,
        justifyContent: 'space-between'
      }
    },
    '.MuiGrid-item': {
      justifyContent: 'center'
    },
    '.MuiTypography-h1': {
      marginBottom: theme.spacing(2)
    },
    '.MuiTypography-h2': {
      ...theme.typography.body1
    },
    '.MuiGrid-container': {
      '& > div:first-child.MuiGrid-container': {
        'flexBasis': `${(7 * 100) / 12}%`,
        'marginTop': 0,
        'marginLeft': 0,
        'maxWidth': 'none',
        'paddingTop': 0,
        'paddingLeft': 0,
        '& > div': {
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0
        }
      },
      '& > div:nth-of-type(2)': {
        'flexBasis': `${(5 * 100) / 12}%`,
        'padding': 0,
        'display': 'flex',
        '& > img': {
          width: '100%'
        }
      }
    }
  }
});

export const heroVariants = [heightMediumHeroVariant, heightShortHeroVariant];

const createHeroVariants = (theme: Theme) => {
  return heroVariants.map((creator) => creator(theme));
};

export default createHeroVariants;
