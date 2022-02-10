import { Theme } from '@mui/material/styles';

export const defaultSectionVariant = (theme: Theme) => ({
  props: {
    variant: 'default'
  },
  style: {
    '& > [class*="Section-gridContainer"]': {
      flexDirection: 'column',
      padding: theme.spacing(10, 0),
      textAlign: 'center'
    },
    '.MuiTypography-root': {
      marginBottom: theme.spacing(3)
    },
    '[class*=Text-root] .MuiTypography-body1': {
      marginBottom: theme.spacing(3),
      fontSize: '1.125rem',
      lineHeight: 1.5555
    }
  }
});

export const fiftyFiftyVariant = (theme: Theme) => ({
  props: {
    variant: '2 col: fifty-fifty'
  },
  style: {
    '& [class*=Section-gridContainer]': {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacing(4)
    }
  }
});

export const twoThirdsVariant = (theme: Theme) => ({
  props: {
    variant: '2 col: two-thirds'
  },
  style: {
    '& [class*=Section-gridContainer]': {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: theme.spacing(4)
    }
  }
});

export const statementWithIconVariant = (theme: Theme) => ({
  props: {
    variant: 'statement w/ icon'
  },
  style: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1.25),
    backgroundColor: theme.palette.midnight.A06,
    border: `1px solid ${theme.palette.midnight.A20}`,

    '& [class*=Section-gridContainer]': {
      alignItems: 'center'
    },

    '& [class*=Section-gridItem]': {
      display: 'flex',

      '&:first-of-type': {
        flex: 0,

        '& [class*=Media-root]': {
          width: 20,
          height: 20,
          marginRight: theme.spacing(1.25),
          padding: 0,
          objectFit: 'contain'
        }
      }
    },

    '& p:last-child': {
      margin: 0
    }
  }
});

const textVariants = [
  defaultSectionVariant,
  fiftyFiftyVariant,
  twoThirdsVariant,
  statementWithIconVariant
];

const createTextVariants = (theme: Theme) => {
  return textVariants.map((creator) => creator(theme));
};

export default createTextVariants;
