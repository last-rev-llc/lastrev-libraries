import { Theme } from '@material-ui/core/styles';

export const defaultVariant = (theme: Theme) => ({
  props: {
    variant: 'default'
  },
  style: {
    position: 'relative',

    // DEMO ONLY
    '& .MuiLink-root': {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: theme.palette.primary.main,
      textDecoration: 'none',
      zIndex: 2,
    },
    '& .MuiGrid-container.formContainer': {
      'borderRadius': 20,
      backgroundColor: theme.palette.tertiary.main,
      'border': `2px solid ${theme.palette.secondary.main}`,
      paddingTop: 20,
      paddingBottom: 40,
      marginTop: 20,

      [theme.breakpoints.down("sm")]: {
        paddingTop: 10,
        paddingBottom: 20,
      }
    },
    '& .MuiGrid-container.submitContainer': {
      [theme.breakpoints.down("sm")]: {
        paddingTop: 20,
        '& .MuiFormControl-root': {
          width: "100%",
          textAlign: "center"
        }
      },

      [theme.breakpoints.up("md")]: {
        alignSelf: "flex-end"
      },
    },

    '& img': {
      position: 'absolute',
      height: "80%",
      maxWidth: "50%",
      bottom: 20,
      right: 0,
      zIndex: 1,
      "object-fit": "fill",

      [theme.breakpoints.down("md")]: {
        bottom: "initial",
        top: 20,
        maxWidth: "25%",
        height: "auto"
      }
    }
  }
});

const variants = [defaultVariant];

const createMailchimpFormVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createMailchimpFormVariants;
