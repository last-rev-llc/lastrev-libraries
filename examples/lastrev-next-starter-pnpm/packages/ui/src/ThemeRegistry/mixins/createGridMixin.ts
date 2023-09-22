import { Theme } from '@mui/material/styles';
declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    gridContainer: (theme: Theme, options?: any) => CSSProperties;
  }
}
export default function gridMixin(theme: Theme) {
  return {
    display: 'grid',
    gridGap: theme.spacing(8),
    gridTemplateColumns: `repeat(12, 1fr)`,
    // gridTemplateColumns: `1fr repeat(12, minmax(0, calc(${theme.breakpoints.values.xxl} / 12 * 1px))) 1fr`,

    [theme.breakpoints.down('xl')]: {
      // gridTemplateColumns: `1fr repeat(12, minmax(0, calc(${theme.breakpoints.values.xl} / 12 * 1px))) 1fr`
    },

    [theme.breakpoints.down('lg')]: {
      // gridTemplateColumns: `1fr repeat(12, minmax(0, calc(${theme.breakpoints.values.lg} / 12 * 1px))) 1fr`
    },

    [theme.breakpoints.down('md')]: {
      // gridTemplateColumns: `1fr repeat(12, minmax(0, calc(${theme.breakpoints.values.md} / 12 * 1px))) 1fr`,
      gridGap: theme.spacing(4)
    },

    [theme.breakpoints.down('sm')]: {
      gridGap: theme.spacing(2)
      // gridTemplateColumns: `1fr repeat(12, minmax(0, calc(${theme.breakpoints.values.sm} / 12 * 1px))) 1fr`
    },

    [theme.breakpoints.down('xs')]: {
      gridGap: theme.spacing(1)
      // gridTemplateColumns: `1fr repeat(12, minmax(0, calc(${theme.breakpoints.values.xs} / 12 * 1px))) 1fr`
    }
  };
}
