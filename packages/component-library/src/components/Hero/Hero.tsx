import React from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import styled from '@mui/system/styled';
import get from 'lodash/get';

import ErrorBoundary from '../ErrorBoundary';

import { MediaProps } from '../Media/Media.types';
import ContentModule from '../ContentModule';

import sidekick from '@last-rev/contentful-sidekick-util';
import getFirstOfArray from '../../utils/getFirstOfArray';
import useThemeProps from '../../utils/useThemeProps';
import { HeroProps } from './Hero.types';

export const Hero = (props: HeroProps) => {
  const theme = useTheme();

  const {
    divider,
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
            <BackgroundMedia
              __typename="Media"
              key={background?.id}
              testId="Hero-background"
              {...background}
              {...sidekick(sidekickLookup?.background)}
              priority
              layout="fill"
              sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </BackgroundRoot>
        ) : null}
        <ContentContainer maxWidth={contentWidth} disableGutters={disableGutters}>
          <ContentRoot container rowSpacing={5} columnSpacing={variant === 'centered' ? 0 : 5}>
            {title || subtitle || body || actions ? (
              <TextsContainer item container direction="column" spacing={2} xs={12} md={6}>
                <TextsRoot item>
                  {overline ? (
                    <OverlineHero
                      data-testid="Hero-overline"
                      variant="overline"
                      {...sidekick(sidekickLookup?.overline)}>
                      {overline}
                    </OverlineHero>
                  ) : null}
                  {title ? (
                    <TitleHero data-testid="Hero-title" variant="h1" {...sidekick(sidekickLookup?.title)}>
                      {title}
                    </TitleHero>
                  ) : null}
                  {subtitle ? (
                    <SubtitleHero
                      data-testid="Hero-subtitle"
                      variant={!title ? 'h1' : 'h2'}
                      {...sidekick(sidekickLookup?.subtitle)}>
                      {subtitle}
                    </SubtitleHero>
                  ) : null}
                  {body ? (
                    <BodyHero
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
                        <ButtonHero key={link.id} {...link} />
                      ))}
                    </ActionsRoot>
                  ) : null}
                </TextsRoot>
              </TextsContainer>
            ) : null}
            {image ? (
              <MediaRoot item xs={12} md={6}>
                <MediaHero
                  __typename="Media"
                  key={image?.id}
                  {...image}
                  {...sidekick(sidekickLookup?.images)}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  testId="Hero-image"
                  priority
                />
              </MediaRoot>
            ) : null}
          </ContentRoot>
        </ContentContainer>
        {divider ? (
          <MediaDivider {...divider} {...sidekick(sidekickLookup?.divider)} testId="Hero-divider" priority />
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const rootStyles = ({
  backgroundColor,
  theme
}: {
  backgroundColor?: string;
  theme: Theme;
  background?: MediaProps;
}) => {
  if (backgroundColor?.includes('gradient') && get(theme.palette, backgroundColor)) {
    return {
      background: get(theme.palette, backgroundColor)?.main,
      color: `${backgroundColor}.contrastText`
    };
  }
  const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
  const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

  if (backgroundColor && get(theme.palette, parsedBGColor)) {
    return {
      backgroundColor: parsedBGColor,
      color: `${paletteColor}.contrastText`
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

const BackgroundRoot = styled(Box, {
  name: 'Hero',
  slot: 'BackgroundRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.backgroundRoot]
})``;

const BackgroundMedia = styled(ContentModule, {
  name: 'Hero',
  slot: 'BackgroundMedia',
  overridesResolver: (_, styles) => [styles.backgroundMedia]
})``;

const ContentContainer = styled(Container, {
  name: 'Hero',
  slot: 'ContentContainer',
  shouldForwardProp: (prop) => prop !== 'variant',
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

const ContentRoot = styled(Grid, {
  name: 'Hero',
  slot: 'ContentRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.contentRoot]
})``;

const TextsContainer = styled(Grid, {
  name: 'Hero',
  slot: 'TextsContainer',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.textsContainer]
})``;

const TextsRoot = styled(Grid, {
  name: 'Hero',
  slot: 'TextsRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.textsRoot]
})``;

const OverlineHero = styled(Typography, {
  name: 'Hero',
  slot: 'OverlineHero',
  overridesResolver: (_, styles) => [styles.overlineHero]
})``;

const TitleHero = styled(Typography, {
  name: 'Hero',
  slot: 'TitleHero',
  overridesResolver: (_, styles) => [styles.titleHero]
})``;

const SubtitleHero = styled(Typography, {
  name: 'Hero',
  slot: 'SubtitleHero',
  overridesResolver: (_, styles) => [styles.subtitleHero]
})``;

const BodyHero = styled(ContentModule, {
  name: 'Hero',
  slot: 'BodyHero',
  overridesResolver: (_, styles) => [styles.bodyHero]
})``;

const ActionsRoot = styled(Box, {
  name: 'Hero',
  slot: 'ActionsRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.actionsRoot]
})`
  display: flex;
`;

const ButtonHero = styled(ContentModule, {
  name: 'Hero',
  slot: 'ButtonHero',
  overridesResolver: (_, styles) => [styles.buttonHero]
})``;

const MediaRoot = styled(Grid, {
  name: 'Hero',
  slot: 'MediaRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.mediaRoot]
})`
  position: relative;
`;

const MediaHero = styled(ContentModule, {
  name: 'Hero',
  slot: 'MediaHero',
  overridesResolver: (_, styles) => [styles.mediaHero]
})``;

const MediaDivider = styled(ContentModule, {
  name: 'Hero',
  slot: 'MediaDivider',
  overridesResolver: (_, styles) => [styles.mediaDivider]
})``;

export default Hero;
