import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Grid'] = {
  overrideNested: false
};

const withoutGaps = (theme: Theme) => ({
  ':is(&) &': {
    gridColumn: 'content-start / content-end',
    gridTemplateColumns: `
      [one-start content-start full-start] minmax(0, 1fr)
      [one-end two-start content-quarter] minmax(0, 1fr)
      [two-end three-start content-half] minmax(0, 1fr)
      [three-end four-start content-three-quarter] minmax(0, 1fr)
      [four-end content-end full-end]
  `,

    [theme.containerBreakpoints.up('sm')]: {
      gridTemplateColumns: `
        [one-start content-start full-start] minmax(0, 1fr)
        [one-end two-start content-quarter] minmax(0, 1fr)
        [two-end three-start content-half] minmax(0, 1fr)
        [three-end four-start content-three-quarter] minmax(0, 1fr)
        [four-end content-end full-end]
      `
    },

    [theme.containerBreakpoints.up('md')]: {
      gridTemplateColumns: `
        [one-start content-start full-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start content-quarter] minmax(0, 1fr)
        [three-end four-start] minmax(0, 1fr)
        [four-end five-start content-half] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start content-three-quarter] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end content-end full-end]
      `
    },

    [theme.containerBreakpoints.up('lg')]: {
      gridTemplateColumns: `
        [one-start content-start full-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start] minmax(0, 1fr)
        [three-end four-start content-quarter] minmax(0, 1fr)
        [four-end five-start] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start content-half] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end nine-start] minmax(0, 1fr)
        [nine-end ten-start content-three-quarter] minmax(0, 1fr)
        [ten-end eleven-start] minmax(0, 1fr)
        [eleven-end twelve-start] minmax(0, 1fr)
        [twelve-end content-end full-end]
      `
    },

    [theme.containerBreakpoints.up('xl')]: {
      gridTemplateColumns: `
        [one-start content-start full-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start] minmax(0, 1fr)
        [three-end four-start content-quarter] minmax(0, 1fr)
        [four-end five-start] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start content-half] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end nine-start] minmax(0, 1fr)
        [nine-end ten-start content-three-quarter] minmax(0, 1fr)
        [ten-end eleven-start] minmax(0, 1fr)
        [eleven-end twelve-start] minmax(0, 1fr)
        [twelve-end content-end full-end]
      `
    }
  }
});

const styleOverrides: ComponentsOverrides<Theme>['Grid'] = {
  root: ({ theme, overrideNested }) => ({
    'display': 'grid',
    'width': '100%',
    '> *': {
      gridColumn: 'content-start / content-end'
    },
    ...(overrideNested ? {} : withoutGaps(theme)),

    'rowGap': 'var(--grid-gap)',
    'columnGap': 'var(--grid-gap)',
    '--content-width': `min(${theme.containerBreakpoints.values.sm}px, (100vw - (2 * var(--grid-margin))))`,

    'gridTemplateColumns': `
        [full-start] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.sm}px / 2)))
        [one-start content-start] minmax(0, 1fr)
        [one-end two-start content-quarter] minmax(0, 1fr)
        [two-end three-start content-half] minmax(0, 1fr)
        [three-end four-start content-three-quarter] minmax(0, 1fr)
        [four-end content-end] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.sm}px / 2)))
        [full-end]
      `,

    [theme.breakpoints.up('sm')]: {
      '--content-width': `min(${theme.containerBreakpoints.values.sm}px, (100vw - (2 * var(--grid-margin))))`,
      'gridTemplateColumns': `
        [full-start] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.md}px / 2)))
        [one-start content-start] minmax(0, 1fr)
        [one-end two-start content-quarter] minmax(0, 1fr)
        [two-end three-start content-half] minmax(0, 1fr)
        [three-end four-start content-three-quarter] minmax(0, 1fr)
        [four-end content-end] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.md}px / 2)))
        [full-end]
      `
    },

    [theme.breakpoints.up('md')]: {
      '--content-width': `min(${theme.containerBreakpoints.values.md}px, (100vw - (2 * var(--grid-margin))))`,
      'gridTemplateColumns': `
        [full-start] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.lg}px / 2)))
        [one-start content-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start content-quarter] minmax(0, 1fr)
        [three-end four-start] minmax(0, 1fr)
        [four-end five-start content-half] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start content-three-quarter] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end content-end] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.lg}px / 2)))
        [full-end]
      `
    },

    [theme.breakpoints.up('lg')]: {
      '--content-width': `min(${theme.containerBreakpoints.values.lg}px, (100vw - (2 * var(--grid-margin))))`,
      'gridTemplateColumns': `
        [full-start] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.xl}px / 2)))
        [one-start content-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start] minmax(0, 1fr)
        [three-end four-start content-quarter] minmax(0, 1fr)
        [four-end five-start] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start content-half] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end nine-start] minmax(0, 1fr)
        [nine-end ten-start content-three-quarter] minmax(0, 1fr)
        [ten-end eleven-start] minmax(0, 1fr)
        [eleven-end twelve-start] minmax(0, 1fr)
        [twelve-end content-end] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.xl}px / 2)))
        [full-end] 
      `
    },

    [theme.breakpoints.up('xl')]: {
      '--content-width': `min(${theme.containerBreakpoints.values.xl}px, (100vw - (2 * var(--grid-margin))))`,
      'gridTemplateColumns': `
        [full-start] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.xl}px / 2)))
        [one-start content-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start] minmax(0, 1fr)
        [three-end four-start content-quarter] minmax(0, 1fr)
        [four-end five-start] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start content-half] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end nine-start] minmax(0, 1fr)
        [nine-end ten-start content-three-quarter] minmax(0, 1fr)
        [ten-end eleven-start] minmax(0, 1fr)
        [eleven-end twelve-start] minmax(0, 1fr)
        [twelve-end content-end] minmax(var(--grid-margin), calc(50vw - var(--grid-margin) - (${theme.containerBreakpoints.values.xl}px / 2)))
        [full-end] 
      `
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['Grid'] => [];

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
