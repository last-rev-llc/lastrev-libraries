import { Theme } from '@material-ui/core/styles';

export const standardCollectionAccordion = (theme: Theme) => ({
  props: {
    variant: 'collection-accordion'
  },
  style: {
    '& .MuiPaper-accordion-standard': {
      background: theme.palette.secondary.main
    },
    '& .MuiTypography-h4': {
      paddingBottom: 0,
      color: 'white',
      fontWeight: 'normal'
    },
    '& .MuiTypography-p': {
      color: theme.palette.primary.main
    },
    '& .MuiCollapse-wrapper': {
      background: 'white'
    },
    '& .MuiSvgIcon-root': {
      color: 'white'
    }
  }
});

const variants = [standardCollectionAccordion];

const createCollectionAccordionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createCollectionAccordionVariants;
