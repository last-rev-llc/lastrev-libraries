import { Theme } from '@mui/material/styles';

// Default, so redundant
export const alignLeftHeroVariant = (_: Theme) => ({
  props: {
    variant: 'Align - Left'
  },
  style: {
    '& .MuiGrid-container': {
      justifyContent: 'flex-start'
    },

    '& .MuiTypography-root': {
      textAlign: 'left'
    }
  }
});

export const alignCenterHeroVariant = (_: Theme) => ({
  props: {
    variant: 'Align - Center'
  },
  style: {
    '& .MuiGrid-container': {
      justifyContent: 'center'
    },

    '& .MuiTypography-root': {
      textAlign: 'center'
    }
  }
});

export const heightMediumHeroVariant = (theme: Theme) => ({
  props: {
    contentHeight: 'md'
  },
  style: {
    'minHeight': 'unset',

    '&[class*="Hero-root"]': {
      paddingTop: theme.spacing(1.5)
    },

    '.MuiTypography-root.MuiTypography-body1': {
      ...theme.typography.body2,

      '.MuiLink-root': {
        'textDecoration': 'underline',
        'textDecorationColor': 'inherit',
        'color': 'inherit',

        '&:hover': {
          textDecoration: 'none'
        }
      }
    }
  }
});

export const heightShortHeroVariant = (theme: Theme) => ({
  props: {
    contentHeight: 'sm'
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

export const heroVariants = [
  alignLeftHeroVariant,
  alignCenterHeroVariant,
  heightMediumHeroVariant,
  heightShortHeroVariant
];

const createHeroVariants = (theme: Theme) => {
  return heroVariants.map((creator) => creator(theme));
};

export default createHeroVariants;
