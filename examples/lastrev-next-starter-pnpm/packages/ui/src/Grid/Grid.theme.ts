import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Grid'] = {};

// TODO: Expose these values in the theme
const smMargin = 8;
const mdMargin = 56;
const lgMargin = 96;

const smGap = 16;
const mdGap = 24;
const lgGap = 24;

const styleOverrides: ComponentsOverrides<Theme>['Grid'] = {
  root: ({ theme }) => ({
    'display': 'grid',
    'width': '100%',
    '> *': {
      gridColumn: 'content-start / content-end'
    },

    '& &': {
      gridColumn: 'content-start / content-end',
      gridTemplateColumns: `
          [one-start content-start full-start] minmax(0, 1fr)
          [one-end two-start] minmax(0, 1fr)
          [two-end three-start content-half] minmax(0, 1fr)
          [three-end four-start] minmax(0, 1fr)
          [four-end content-end full-end]
      `,

      [theme.containerBreakpoints.up('md')]: {
        gridTemplateColumns: `
          [one-start content-start full-start] minmax(0, 1fr)
          [one-end two-start] minmax(0, 1fr)
          [two-end three-start] minmax(0, 1fr)
          [three-end four-start] minmax(0, 1fr)
          [four-end five-start content-half] minmax(0, 1fr)
          [five-end six-start] minmax(0, 1fr)
          [six-end seven-start ] minmax(0, 1fr)
          [seven-end eight-start] minmax(0, 1fr)
          [eight-end content-end full-end]
        `
      },

      [theme.containerBreakpoints.up('lg')]: {
        gridTemplateColumns: `
          [one-start content-start full-start] minmax(0, 1fr)
          [one-end two-start] minmax(0, 1fr)
          [two-end three-start] minmax(0, 1fr)
          [three-end four-start] minmax(0, 1fr)
          [four-end five-start] minmax(0, 1fr)
          [five-end six-start] minmax(0, 1fr)
          [six-end seven-start content-half] minmax(0, 1fr)
          [seven-end eight-start] minmax(0, 1fr)
          [eight-end nine-start] minmax(0, 1fr)
          [nine-end ten-start] minmax(0, 1fr)
          [ten-end eleven-start] minmax(0, 1fr)
          [eleven-end twelve-start] minmax(0, 1fr)
          [twelve-end content-end full-end]
        `
      }
    },

    'gridGap': smGap,
    'gridTemplateColumns': `
      [full-start] minmax(${smMargin}px, calc(50vw - calc((${theme.containerBreakpoints.values.md}px / 2) - ${smMargin}px)))
      [one-start content-start] minmax(0, 1fr)
      [one-end two-start] minmax(0, 1fr)
      [two-end three-start content-half] minmax(0, 1fr)
      [three-end four-start] minmax(0, 1fr)
      [four-end content-end] minmax(${smMargin}px, calc(50vw - calc((${theme.containerBreakpoints.values.md}px / 2) - ${smMargin}px)))
      [full-end]
    `,

    [theme.breakpoints.up('md')]: {
      gridGap: mdGap,
      gridTemplateColumns: `
        [full-start] minmax(${mdMargin}px, calc(50vw - calc((${theme.containerBreakpoints.values.lg}px / 2) - ${mdMargin}px)))
        [one-start content-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start] minmax(0, 1fr)
        [three-end four-start] minmax(0, 1fr)
        [four-end five-start content-half] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start ] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end content-end] minmax(${mdMargin}px, calc(50vw - calc((${theme.containerBreakpoints.values.lg}px / 2) - ${mdMargin}px)))
        [full-end]
      `
    },

    [theme.breakpoints.up('lg')]: {
      gridGap: lgGap,
      gridTemplateColumns: `
        [full-start] minmax(${lgMargin}px, calc(50vw - calc((${theme.containerBreakpoints.values.xl}px / 2) - ${lgMargin}px)))
        [one-start content-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start] minmax(0, 1fr)
        [three-end four-start] minmax(0, 1fr)
        [four-end five-start] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start content-half] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end nine-start] minmax(0, 1fr)
        [nine-end ten-start] minmax(0, 1fr)
        [ten-end eleven-start] minmax(0, 1fr)
        [eleven-end twelve-start] minmax(0, 1fr)
        [twelve-end content-end] minmax(${lgMargin}px, calc(50vw - calc((${theme.containerBreakpoints.values.xl}px / 2) - ${lgMargin}px)))
        [full-end] 
      `
    },

    [theme.breakpoints.up('xl')]: {
      gridGap: lgGap,
      gridTemplateColumns: `
        [full-start] minmax(${lgMargin}px, calc(50vw - calc((${theme.containerBreakpoints.values.xl}px / 1.25) - ${lgMargin}px)))
        [one-start content-start] minmax(0, 1fr)
        [one-end two-start] minmax(0, 1fr)
        [two-end three-start] minmax(0, 1fr)
        [three-end four-start] minmax(0, 1fr)
        [four-end five-start] minmax(0, 1fr)
        [five-end six-start] minmax(0, 1fr)
        [six-end seven-start content-half] minmax(0, 1fr)
        [seven-end eight-start] minmax(0, 1fr)
        [eight-end nine-start] minmax(0, 1fr)
        [nine-end ten-start] minmax(0, 1fr)
        [ten-end eleven-start] minmax(0, 1fr)
        [eleven-end twelve-start] minmax(0, 1fr)
        [twelve-end content-end] minmax(${lgMargin}px, calc(50vw - calc((${theme.containerBreakpoints.values.xl}px / 1.25) - ${lgMargin}px)))
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
