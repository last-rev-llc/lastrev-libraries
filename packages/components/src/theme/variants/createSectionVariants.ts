import { Theme } from '@mui/material/styles';

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
    // TODO: Move all hex colors to theme
    backgroundColor: '#F0F3F4',
    border: '1px solid #CCD6DB',

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
  fiftyFiftyVariant,
  twoThirdsVariant,
  statementWithIconVariant
];

const createTextVariants = (theme: Theme) => {
  return textVariants.map((creator) => creator(theme));
};

export default createTextVariants;
