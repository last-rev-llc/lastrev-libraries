import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const SITEMESSAGE_TIMEOUT = '200s';

const defaultProps: ComponentsProps['SiteMessage'] = {};

const styleOverrides: ComponentsOverrides<Theme>['SiteMessage'] = {
  root: ({ theme, ownerState }) => ({
    'backgroundColor': theme.vars.palette.primary.main,

    '& *': {
      color: theme.vars.palette.common.white
    },

    [theme.containerBreakpoints.down('md')]: {
      margin: theme.spacing(0, -2),
      transform: 'scaleY(1)',
      transformOrigin: 'top',
      transformStyle: 'flat',
      maxHeight: '100%',
      transition: 'transform 250ms ease, max-height 250ms ease, height 250ms ease'
      // 'animation': `collapse 250ms ease ${SITEMESSAGE_TIMEOUT} forwards`,
      // '@keyframes collapse': {
      //   to: {
      //     transform: 'scaleY(0)',
      //     maxHeight: 0,
      //     height: 0
      //   }
      // },

      // ...(!!ownerState.isElevated && {
      //   visibility: 'hidden',
      //   maxHeight: 0,
      //   height: 0
      // })
    },

    [theme.containerBreakpoints.up('md')]: {
      margin: theme.spacing(0, -5),

      ...(!!ownerState.isElevated && {
        transform: 'scaleY(0)',
        maxHeight: 0,
        height: 0
      })
    }
  }),

  // contentOuterGrid: : {},

  contentWrap: ({ theme }) => ({
    '& > *': {
      display: 'inline',
      width: 'auto'
    },
    'display': 'inline-flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'justifyContent': 'center',
    'gap': theme.spacing(2)
  }),

  icon: ({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),

    img: {
      objectFit: 'contain',
      width: 'inherit',
      height: 'inherit'
    }
  })

  // link: : {},

  // text: : {}
};

const createVariants = (_theme: Theme): ComponentsVariants['SiteMessage'] => [];

export const siteMessageTheme = (theme: Theme): ThemeOptions => ({
  components: {
    SiteMessage: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default siteMessageTheme;
