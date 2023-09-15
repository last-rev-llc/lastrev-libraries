import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['CollectionExpanding'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['CollectionExpanding'] = {
  root: () => ({}),

  contentContainer: ({ theme }) => ({}),

  introTextWrapper: ({ theme }) => ({}),

  introText: ({}) => ({})
};

const createVariants = (theme: Theme): ComponentsVariants['CollectionExpanding'] => [
  {
    props: {
      variant: 'default'
    },
    style: {}
  }
];

export const CollectionExpandingTheme = (theme: Theme): ThemeOptions => ({
  components: {
    CollectionExpanding: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default CollectionExpandingTheme;
