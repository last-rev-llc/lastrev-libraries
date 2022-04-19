import React from 'react';
import { Container, Box, Grid, Typography, Theme } from '@mui/material';
import { Palette, PaletteColor } from '@mui/material/styles';
import styled from '@mui/system/styled';
import get from 'lodash/get';

import ErrorBoundary from '../ErrorBoundary';
import Media, { MediaProps } from '../Media';
import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';
import getFirstOfArray from '../../utils/getFirstOfArray';
import useThemeProps from '../../utils/useThemeProps';
import { HeroProps } from './Hero.types';
import { useTheme } from '@mui/system';

export const Hero = (props: HeroProps) => {
  const theme = useTheme<Theme>();
  const {
    variant,
    background,
    backgroundColor,
    contentWidth,
    contentHeight = 'lg',
    overline,
    title,
    subtitle,
    body,
    actions,
    image: deprecatedImage,
    images,
    sidekickLookup,
    disableGutters = true
  } = useThemeProps({ props, name: 'Hero' });
  const image = getFirstOfArray(images ?? deprecatedImage);
  return (
    <ErrorBoundary>
      <Root
        data-testid="Hero"
        variant={variant}
        contentHeight={contentHeight}
        {...sidekick(sidekickLookup)}
        sx={{
          ...rootStyles({ backgroundColor, theme, background }),
          position: background ? 'relative' : undefined,
          overflow: background ? 'hidden' : undefined,
          py: 4
        }}>
        {background ? (
          <BackgroundRoot
            sx={{
              position: 'absolute',
              zIndex: 0,
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}>
            <Media
              testId="Hero-background"
              {...background}
              {...sidekick(sidekickLookup?.background)}
              priority
              sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </BackgroundRoot>
        ) : null}
        <ContentContainer maxWidth={contentWidth} disableGutters={disableGutters}>
          <Grid container rowSpacing={5} columnSpacing={variant === 'centered' ? 0 : 5}>
            {title || subtitle || body || actions ? (
              <Grid item container direction="column" spacing={2} xs={12} md={6}>
                <Grid item>
                  {overline ? (
                    <Typography
                      data-testid="Hero-overline"
                      variant="overline"
                      sx={{ color: !subtitle ? 'secondary.main' : undefined }}
                      {...sidekick(sidekickLookup?.overline)}>
                      {overline}
                    </Typography>
                  ) : null}
                  {title ? (
                    <Typography
                      data-testid="Hero-title"
                      variant="h1"
                      component="h1"
                      sx={{ color: !subtitle ? 'secondary.main' : undefined }}
                      {...sidekick(sidekickLookup?.title)}>
                      {title}
                    </Typography>
                  ) : null}
                  {subtitle ? (
                    <Typography
                      data-testid="Hero-subtitle"
                      variant={!title ? 'h1' : 'h2'}
                      component={!title ? 'h1' : 'h2'}
                      sx={{ color: !title ? 'secondary.main' : undefined }}
                      {...sidekick(sidekickLookup?.subtitle)}>
                      {subtitle}
                    </Typography>
                  ) : null}
                  {body ? (
                    <ContentModule
                      __typename="Text"
                      variant="hero"
                      body={body}
                      data-testid="Hero-body"
                      {...sidekick(sidekickLookup?.body)}
                    />
                  ) : null}
                  {actions ? (
                    <ActionsRoot pt={title || subtitle || body ? 3 : undefined} {...sidekick(sidekickLookup?.actions)}>
                      {actions?.map((link) => (
                        <ContentModule key={link.id} {...link} />
                      ))}
                    </ActionsRoot>
                  ) : null}
                </Grid>
              </Grid>
            ) : null}
            {image ? (
              <MediaRoot item xs={12} md={6}>
                <Media {...getFirstOfArray(image)} {...sidekick(sidekickLookup?.image)} testId="Hero-image" priority />
              </MediaRoot>
            ) : null}
          </Grid>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

type Color = keyof Palette;

const rootStyles = ({
  backgroundColor,
  theme,
  background
}: {
  backgroundColor?: Color | 'white' | 'black';
  theme: Theme;
  background?: MediaProps;
}) => {
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
      'background': (theme.palette[backgroundColor] as PaletteColor)?.main,
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
  overridesResolver: ({ contentHeight }, styles) => [
    styles.root,
    styles[`contentHeight${contentHeight?.toUpperCase()}`]
  ]
})<{ variant?: string; contentHeight: string }>(({ contentHeight }) => ({
  width: '100%',
  minHeight: CONTENT_HEIGHT[contentHeight] ?? 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center'
}));

const MediaRoot = styled(Grid, {
  name: 'Hero',
  slot: 'MediaRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.mediaRoot]
})``;

const BackgroundRoot = styled(Box, {
  name: 'Hero',
  slot: 'BackgroundRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.backgroundRoot]
})``;

const ActionsRoot = styled(Box, {
  name: 'Hero',
  slot: 'ActionsRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.actionsRoot]
})`
  display: flex;
`;

const ContentContainer = styled(Container, {
  name: 'Hero',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(({ theme }) => ({
  zIndex: 1,
  alignSelf: 'center',
  height: '100%',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}));

export default Hero;
