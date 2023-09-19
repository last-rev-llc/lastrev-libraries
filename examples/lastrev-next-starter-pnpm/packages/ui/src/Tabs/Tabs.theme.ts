import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Tabs'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Tabs'] = {
  root: () => ({}),

  contentContainer: ({ theme }) => ({}),

  introTextWrapper: ({ theme }) => ({}),

  introText: ({}) => ({})
};

const createVariants = (theme: Theme): ComponentsVariants['Tabs'] => [
  {
    props: {
      variant: 'default'
    },
    style: {}
  }
];

export const TabsTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Tabs: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default TabsTheme;
