import { Theme } from '@mui/material/styles';

// Here's how you define different variants of a component.
export const defaultCardVariant = (_theme: Theme) => ({
  props: {
    variant: 'default'
  },
  style: {}
});

const variants = [defaultCardVariant];

const createCardVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createCardVariants;
