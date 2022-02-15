import { Theme } from '@mui/material/styles';

export const heightMediumHeroVariant = (theme: Theme) => ({
  props: {
    variant: 'Height - Med'
  },
  style: {
    minHeight: 'unset',

    '&[class*="Hero-root"]': {
      paddingTop: theme.spacing(1.5),
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

export const heroVariants = [ heightMediumHeroVariant ];

const createHeroVariants = (theme: Theme) => {
  return heroVariants.map((creator) => creator(theme));
};

export default createHeroVariants;
