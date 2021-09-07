import React from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import useTheme from '@material-ui/system/useTheme';
import { Theme } from '@material-ui/system/createTheme';
import { SystemCssProperties } from '@material-ui/system/styleFunctionSx';
import get from 'lodash/get';
import ErrorBoundary from '../ErrorBoundary';
import Link from '../Link';
import Media from '../Media';
// import { LinkProps } from '../Link/Link';
import { MediaProps } from '../Media/Media.types';
import Text, { RichText } from '../Text';
// import { RichTextProps } from '../RichText';
import { Breakpoint } from '@material-ui/core';
import sidekick from '../../utils/sidekick';
export interface HeroProps {
  id: string;
  __typename: string;
  title?: string;
  subtitle?: string;
  body?: RichText;
  actions?: any[];
  image?: MediaProps | MediaProps[];
  background?: MediaProps;
  backgroundColor?: string;
  contentWidth?: false | Breakpoint | undefined;
  contentHeight?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: any;
  theme: any;
  styles?: {
    root?: SystemCssProperties;
    gridContainer?: SystemCssProperties & { spacing: any };
    gridItem?: SystemCssProperties & { xs: any; sm: any; md: any };
    gridItems?: Array<SystemCssProperties & { xs: any; sm: any; md: any }>;
  };
  sidekickLookup?: any;
}

export const Hero = ({
  variant,
  background,
  backgroundColor,
  contentWidth,
  contentHeight = 'lg',
  title,
  subtitle,
  body,
  actions,
  image,
  sidekickLookup
}: // theme
HeroProps) => {
  const theme = useTheme();
  return (
    <ErrorBoundary>
      <Root
        variant={variant}
        contentHeight={contentHeight}
        {...sidekick(sidekickLookup)}
        sx={{
          ...rootStyles({ backgroundColor, theme, background }),
          position: background ? 'relative' : undefined,
          overflow: background ? 'hidden' : undefined
        }}>
        {background ? (
          <Box
            sx={{
              position: 'absolute',
              zIndex: -1,
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}>
            <Media
              {...background}
              {...sidekick(sidekickLookup?.background)}
              sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </Box>
        ) : null}
        <ContentContainer maxWidth={contentWidth}>
          <Grid container rowSpacing={5} columnSpacing={variant === 'centered' ? 0 : 5}>
            {title || subtitle || body || actions ? (
              <Grid container direction="column" spacing={2} xs={12}>
                <Grid item>
                  {title ? (
                    <Typography
                      variant="h1"
                      component="h1"
                      sx={{ color: !subtitle ? 'secondary.main' : undefined }}
                      {...sidekick(sidekickLookup?.title)}>
                      {title}
                    </Typography>
                  ) : null}
                  {subtitle ? (
                    <Typography
                      variant={!title ? 'h1' : 'h2'}
                      component={!title ? 'h1' : 'h2'}
                      sx={{ color: !title ? 'secondary.main' : undefined }}
                      {...sidekick(sidekickLookup?.subtitle)}>
                      {subtitle}
                    </Typography>
                  ) : null}
                </Grid>
                {body ? (
                  <Grid item {...sidekick(sidekickLookup?.body)}>
                    <Text body={body} />
                  </Grid>
                ) : null}
                {actions ? (
                  <Grid item pt={3} {...sidekick(sidekickLookup?.actions)}>
                    {actions?.map((link) => (
                      <Link key={link.id} {...link} />
                    ))}
                  </Grid>
                ) : null}
              </Grid>
            ) : null}
            {image ? (
              <Grid item xs={12} sm={6}>
                <Media {...(Array.isArray(image) ? image[0] : image)} {...sidekick(sidekickLookup?.image)} />
              </Grid>
            ) : null}
          </Grid>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const rootStyles = ({
  backgroundColor,
  theme,
  background
}: {
  backgroundColor?: string;
  theme: Theme;
  background?: MediaProps;
}) => {
  if (!!background) {
    return {
      'backgroundColor': 'transparent',
      'color': 'white',
      // TODO find out a better way to override text color
      '& p, h1, h2, h3, h4, h5, h6, a': {
        color: 'white'
      }
    };
  }
  if (backgroundColor === 'white') {
    return { backgroundColor };
  }
  if (backgroundColor === 'black') {
    return {
      backgroundColor,
      'color': 'white',
      // TODO find out a better way to override text color
      '& p, h1, h2, h3, h4, h5, h6, a': {
        color: 'white'
      }
    };
  }
  if (backgroundColor?.includes('gradient') && theme.palette[backgroundColor]) {
    return {
      'background': theme.palette[backgroundColor]?.main,
      'color': `${backgroundColor}.contrastText`,
      // TODO find out a better way to override text color
      '& p, h1, h2, h3, h4, h5, h6, a': {
        color: `${backgroundColor}.contrastText`
      }
    };
  }
  const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
  const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

  if (backgroundColor && get(theme.palette, parsedBGColor)) {
    return {
      'bgcolor': parsedBGColor,
      '& p, h1, h2, h3, h4, h5, h6, a': {
        color: `${paletteColor}.contrastText`
      }
    };
  }
  return {};
};

const CONTENT_HEIGHT: { [key: string]: string } = {
  sm: '25vh',
  md: '50vh',
  lg: '75vh',
  xl: '100vh'
};

const Root = styled(Box, {
  name: 'Hero',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string; contentHeight: string }>(({ contentHeight }) => ({
  height: CONTENT_HEIGHT[contentHeight] ?? 'auto'
}));

const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(({ theme }) => ({
  padding: theme.spacing(5),
  height: '100%',
  [theme.breakpoints.down('lg')]: {
    '& > div': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}));

export default Hero;
