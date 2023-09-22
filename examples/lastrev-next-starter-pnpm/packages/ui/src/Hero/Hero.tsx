import React from 'react';

import { styled } from '@mui/material/styles';

import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Container, { ContainerProps } from '@mui/material/Container';

import sidekick from '@last-rev/contentful-sidekick-util';

// import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import getFirstOfArray from '../utils/getFirstOfArray';

import { HeroProps } from './Hero.types';
import { LinkProps } from '../Link/Link.types';

export const Hero = (props: HeroProps) => {
  const {
    variant,
    background,
    backgroundColor,
    contentHeight,
    overline,
    title,
    subtitle,
    body,
    actions,
    images,
    sidekickLookup
  } = props;

  const image = getFirstOfArray(images);

  const ownerState = {
    variant,
    backgroundColor,
    background,
    contentHeight
  };

  // TODO: Better way?
  const isFullBleed = variant?.indexOf('FullBleed') > -1;

  return (
    // <ErrorBoundary>
    <HeroRoot data-testid="Hero" variant={variant} ownerState={ownerState} {...sidekick(sidekickLookup)}>
      {background ? (
        <BackgroundRoot>
          <BackgroundRootContent
            key={background?.id}
            testId="Hero-background"
            {...background}
            {...sidekick(sidekickLookup, 'background')}
            priority
            layout="fill"
          />
        </BackgroundRoot>
      ) : null}

      <contentOuterGrid maxWidth={isFullBleed ? false : undefined} disableGutters={isFullBleed}>
        {overline || title || subtitle || body || actions ? (
          <MainContentWrapper variant={variant} maxWidth={false} sx={{ p: 0 }}>
            <Content>
              {!!overline && <Overline variant="overline">{overline}</Overline>}

              {!!title && (
                <Title
                  {...sidekick(sidekickLookup, 'title')}
                  data-testid="Hero-title"
                  component="h1"
                  variant="display3">
                  {title}
                </Title>
              )}

              {!!subtitle && (
                <Subtitle {...sidekick(sidekickLookup, 'subtitle')} data-testid="Hero-subtitle" variant="display2">
                  {subtitle}
                </Subtitle>
              )}

              {!!body && <Body {...sidekick(sidekickLookup, 'body')} __typename="Text" body={body} />}
            </Content>

            {!!actions?.length && (
              <ActionsWrapper {...sidekick(sidekickLookup, 'actions')} data-testid="Hero-actions">
                {actions.map((action: LinkProps) => (
                  <Action key={action?.id} {...(action as LinkProps)} />
                ))}
              </ActionsWrapper>
            )}
          </MainContentWrapper>
        ) : null}

        {image ? (
          <SideContentWrapper variant={variant} maxWidth={false} disableGutters={isFullBleed}>
            <ContentModule
              __typename="Media"
              {...sidekick(sidekickLookup, 'images')}
              {...image}
              data-testid="Hero-media"
            />
          </SideContentWrapper>
        ) : null}
      </contentOuterGrid>
    </HeroRoot>
    // </ErrorBoundary>
  );
};

const HeroRoot = styled(Box, {
  name: 'Hero',
  slot: 'HeroRoot',
  shouldForwardProp: (prop) =>
    prop !== 'variant' &&
    prop !== 'contentWidth' &&
    prop !== 'ownerState' &&
    prop !== 'contentHeight' &&
    prop !== 'sidekickLookup' &&
    prop !== 'internalTitle',
  overridesResolver: (_, styles) => [styles.heroRoot]
})<BoxProps>(() => ({}));

const contentOuterGrid = styled(Container, {
  name: 'Hero',
  slot: 'contentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<ContainerProps<React.ElementType>>(() => ({}));

const MainContentWrapper = styled(Container, {
  name: 'Hero',
  slot: 'MainContentWrapper',
  overridesResolver: (_, styles) => [styles.mainContentWrapper]
})<ContainerProps<React.ElementType>>(() => ({}));

const Content = styled(Box, {
  name: 'Hero',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})<BoxProps<React.ElementType>>(() => ({}));

const BackgroundRootContent = styled(ContentModule, {
  name: 'Hero',
  slot: 'BackgroundRootContent',
  overridesResolver: (_, styles) => [styles.backgroundRootContent]
})(() => ({}));

const Overline = styled(Typography, {
  name: 'Hero',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<TypographyProps<React.ElementType>>(() => ({}));

const Title = styled(Typography, {
  name: 'Hero',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps<React.ElementType>>(() => ({}));

const Subtitle = styled(Typography, {
  name: 'Hero',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps<React.ElementType>>(() => ({}));

const Body = styled(ContentModule, {
  name: 'Hero',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})(() => ({}));

const SideContentWrapper = styled(Container, {
  name: 'Hero',
  slot: 'SideContentWrapper',

  overridesResolver: (_, styles) => [styles.sideContentWrapper]
})<ContainerProps<React.ElementType>>(() => ({}));

const BackgroundRoot = styled(Box, {
  name: 'Hero',
  slot: 'BackgroundRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.backgroundRoot]
})``;

const ActionsWrapper = styled(Box, {
  name: 'Hero',
  slot: 'ActionsWrapper',

  overridesResolver: (_, styles) => [styles.actionsWrapper]
})<BoxProps<React.ElementType>>(() => ({}));

const Action = styled(ContentModule, {
  name: 'Hero',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})(() => ({}));

export default Hero;
