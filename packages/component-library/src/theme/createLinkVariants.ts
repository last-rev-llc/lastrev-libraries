import { Theme } from '@material-ui/core/styles';

export const ButtonContainedVariant = (theme: Theme) => ({
  props: {
    variant: 'button-contained'
  },
  style: {
    padding: '10px 20px',
    backgroundColor: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

export const ButtonOutlinedVariant = (theme: Theme) => ({
  props: {
    variant: 'button-outlined'
  },
  style: {
    padding: '10px 20px',
    borderColor: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

export const ButtonTextVariant = (_: Theme) => ({
  props: {
    variant: 'button-text'
  },
  style: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    textDecoration: 'none'
  }
});

export const LinkVariant = (_: Theme) => ({
  props: {
    variant: 'link'
  },
  style: {
    padding: 0,
    textDecoration: 'none'
  }
});

const variants = [ButtonContainedVariant, ButtonOutlinedVariant, ButtonTextVariant, LinkVariant];

const createLinkVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createLinkVariants;
