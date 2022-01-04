import { Theme } from '@mui/material/styles';

// Here's how you define different variants of a component.
export const defaultCardVariant = (_theme: Theme) => ({
  props: {
    variant: 'default'
  },
  style: {}
});

export const cardVariants = [defaultCardVariant];

const createCardVariants = (theme: Theme) => {
  return cardVariants.map((creator) => creator(theme));
};

export default createCardVariants;
