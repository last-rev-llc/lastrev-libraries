import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

export const defaultProps: ComponentsProps['Grid'] = {};

// TODO: Expose these values in the theme
const smMargin = 8;
const mdMargin = 56;
const lgMargin = 96;

const smGap = 16;
const mdGap = 24;
const lgGap = 24;

export const styleOverrides: ComponentsOverrides<Theme>['Grid'] = {
  root: ({ theme }) => ({
    'display': 'grid',
    'width': '100%',
    'gridGap': lgGap,
    '> *': {
      gridColumn: 'content-start / content-end'
    },
    // '&:before': {
    //   content: '""',
    //   background: 'blue',
    //   display: 'block',
    //   height: '100%',
    //   gridColumn: 'full-start / span 1',
    //   gridRow: '1 / span 1'
    // },
    // '&:after': {
    //   content: '""',
    //   background: 'red',
    //   display: 'block',
    //   height: '100%',
    //   gridColumn: 'content-end / span 1',
    //   gridRow: '1 / span 1'
    // },

    'gridTemplateColumns': `
      [full-start] minmax(${lgMargin - lgGap}px, calc(50vw - calc((1440px / 2) - ${lgGap}px)))
      [one-start content-start] minmax(0,1fr)
      [one-end two-start] minmax(0,1fr)
      [two-end three-start] minmax(0,1fr)
      [three-end four-start] minmax(0,1fr)
      [four-end five-start] minmax(0,1fr)
      [five-end six-start] minmax(0,1fr)
      [six-end seven-start content-half] minmax(0,1fr)
      [seven-end eight-start] minmax(0,1fr)
      [eight-end nine-start] minmax(0,1fr)
      [nine-end ten-start] minmax(0,1fr)
      [ten-end eleven-start] minmax(0,1fr)
      [eleven-end twelve-start] minmax(0,1fr)
      [twelve-end content-end] minmax(${lgMargin - lgGap}px, calc(50vw - calc((1440px / 2) - ${lgGap}px)))
      [full-end]
    `,
    [theme.breakpoints.down('md')]: {
      gridGap: mdGap,
      gridTemplateColumns: `
        [full-start] minmax(${mdMargin}px,calc(50vw - calc((1472px / 2) - ${mdMargin}px)))
      [one-start content-start] minmax(0,1fr)
      [one-end two-start] minmax(0,1fr)
      [two-end three-start] minmax(0,1fr)
      [three-end four-start] minmax(0,1fr)
      [four-end five-start content-half] minmax(0,1fr)
      [five-end six-start] minmax(0,1fr)
      [six-end seven-start ] minmax(0,1fr)
      [seven-end eight-start] minmax(0,1fr)
      [eight-end content-end] minmax(${mdMargin}px,calc(50vw - calc((1472px / 2) - ${mdMargin}px)))
      [full-end]
    `
    },
    [theme.breakpoints.down('sm')]: {
      gridGap: smGap,
      gridTemplateColumns: `
        [full-start] minmax(${smMargin}px,calc(50vw - calc((1472px / 2) - ${smMargin}px)))
        [one-start content-start] minmax(0,1fr)
        [one-end two-start] minmax(0,1fr)
        [two-end three-start content-half] minmax(0,1fr)
        [three-end four-start] minmax(0,1fr)
        [four-end content-end] minmax(${smMargin}px,calc(50vw - calc((1472px / 2) - ${smMargin}px)))
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
