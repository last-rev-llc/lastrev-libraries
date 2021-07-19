import { Theme } from '@material-ui/core/styles';

export const singlePanelVariant = (theme: Theme) => ({
  props: {
    variant: 'single-panel'
  },
  style: {
    position: 'relative',
    backgroundColor: theme.palette.primary.main
    // maxWidth: 400,
    // minWidth: 400,

    // '& img': {
    //   opacity: 1,
    //   transition: 'opacity ease .15s'
    // },

    // '& .MuiTypography-h4': {
    //   fontSize: 32,
    // },
  }
});

export const splitPanelVariant = (theme: Theme) => ({
  props: {
    variant: 'split-panel'
  },
  style: {
    position: 'relative',
    backgroundColor: theme.palette.secondary.main
    // maxWidth: 400,
    // minWidth: 400,

    // '& img': {
    //   opacity: 1,
    //   transition: 'opacity ease .15s'
    // },

    // '& .MuiTypography-h4': {
    //   fontSize: 32,
    // },
  }
});

const variants = [
  singlePanelVariant,
  splitPanelVariant,
];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
