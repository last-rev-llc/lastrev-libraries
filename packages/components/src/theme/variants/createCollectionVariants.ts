import { Theme } from '@mui/material/styles';

export const fourPerRowCollection = (theme: Theme) => ({
  props: {
    variant: 'four-per-row'
  },
  style: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    '[class*="Section-root"] > [class*="Section-gridContainer"]': {
      gridTemplateColumns: 'repeat(1, 1fr)',

      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, 1fr)'
      }
    }
  }
});

export const collectionVariants = [fourPerRowCollection];

const createCollectionVariants = (theme: Theme) => {
  return collectionVariants.map((creator) => creator(theme));
};

export default createCollectionVariants;
