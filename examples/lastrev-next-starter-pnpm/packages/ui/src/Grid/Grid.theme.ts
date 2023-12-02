import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Grid'] = {
  overrideNested: false
};

const styleOverrides: ComponentsOverrides<Theme>['Grid'] = {
  root: ({ overrideNested }) => ({
    'display': 'grid',
    'width': '100%',
    'rowGap': 'var(--grid-gap)',
    'columnGap': 'var(--grid-gap)',

    'gridTemplateColumns': `
        [full-start] var(--container-gutter)
        [one-start start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start] minmax(0, 1fr)
        [three-end four-start quarter] minmax(0, 1fr)
        [four-end five-start] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start half] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end nine-start] minmax(0, 1fr)
        [nine-end ten-start three-quarter] minmax(0, 1fr)
        [ten-end eleven-start] minmax(0, 1fr)
        [eleven-end twelve-start] minmax(0, 1fr)
        [twelve-end end] var(--container-gutter)
        [full-end] 
      `,

    ...(!!overrideNested && {
      ':is(&) &': {
        gridColumn: 'start / end',

        gridTemplateColumns: `
            [one-start start full-start] minmax(0, 1fr)
            [one-end two-start] minmax(0, 1fr)
            [two-end three-start] minmax(0, 1fr)
            [three-end four-start quarter] minmax(0, 1fr)
            [four-end five-start] minmax(0, 1fr)
            [five-end six-start] minmax(0, 1fr)
            [six-end seven-start half] minmax(0, 1fr)
            [seven-end eight-start] minmax(0, 1fr)
            [eight-end nine-start] minmax(0, 1fr)
            [nine-end ten-start three-quarter] minmax(0, 1fr)
            [ten-end eleven-start] minmax(0, 1fr)
            [eleven-end twelve-start] minmax(0, 1fr)
            [twelve-end end full-end]
          `
      }
    }),

    '> *': {
      gridColumn: 'start / end'
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Grid'] => [];

export const gridTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Grid: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default gridTheme;
