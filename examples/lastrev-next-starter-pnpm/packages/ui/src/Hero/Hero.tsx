import React from 'react';

import { styled } from '@mui/material/styles';

import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Container, { ContainerProps } from '@mui/material/Container';

import sidekick from '@last-rev/contentful-sidekick-util';

// import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import getFirstOfArray from '../utils/getFirstOfArray';

import { HeroProps, HeroOwnerState } from './Hero.types';
import { LinkProps } from '../Link/Link.types';
import Grid from '../Grid';

export const Hero = (props: HeroProps) => {
  const {
    overline,
    variant,
    background,
    backgroundColor,
    title,
    subtitle,
    body,
    actions,
    sideImageItems,
    sidekickLookup
  } = props;

  const image = getFirstOfArray(sideImageItems);

  const ownerState = {
    ...props
  };

  // TODO: Better way?
  const isFullBleed = variant?.indexOf('FullBleed') > -1;

  return (
    // <ErrorBoundary>
    <HeroRoot data-testid="Hero" ownerState={ownerState} {...sidekick(sidekickLookup)}>
      {background ? (
        // <BackgroundRoot>
        <BackgroundRootContent
          key={background?.id}
          testId="Hero-background"
          ownerState={ownerState}
          {...background}
          {...sidekick(sidekickLookup, 'background')}
          priority
        />
      ) : // </BackgroundRoot>
      null}

      <ContentOuterGrid ownerState={ownerState}>
        {overline || title || subtitle || body || actions ? (
          <MainContentWrapper ownerState={ownerState}>
            <Content ownerState={ownerState}>
              {!!overline && (
                <Overline ownerState={ownerState} variant="overline">
                  {overline}
                </Overline>
              )}

              {!!title && (
                <Title
                  {...sidekick(sidekickLookup, 'title')}
                  data-testid="Hero-title"
                  ownerState={ownerState}
                  component="h1"
                  variant="display3">
                  {title}
                </Title>
              )}

              {!!subtitle && (
                <Subtitle
                  ownerState={ownerState}
                  {...sidekick(sidekickLookup, 'subtitle')}
                  data-testid="Hero-subtitle"
                  variant="display2">
                  {subtitle}
                </Subtitle>
              )}

              {!!body && (
                <Body ownerState={ownerState} {...sidekick(sidekickLookup, 'body')} __typename="Text" body={body} />
              )}
            </Content>

            {!!actions?.length && (
              <ActionsWrapper
                ownerState={ownerState}
                {...sidekick(sidekickLookup, 'actions')}
                data-testid="Hero-actions">
                {actions.map((action) => (
                  <Action ownerState={ownerState} key={action?.id} {...action} />
                ))}
              </ActionsWrapper>
            )}
          </MainContentWrapper>
        ) : null}

        {image ? (
          <SideContentWrapper ownerState={ownerState}>
            <ContentModule {...sidekick(sidekickLookup, 'images')} {...image} data-testid="Hero-media" />
          </SideContentWrapper>
        ) : null}
      </ContentOuterGrid>
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
})<{ ownerState: HeroOwnerState }>(() => ({}));

const ContentOuterGrid = styled(Grid, {
  name: 'Hero',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const MainContentWrapper = styled(Box, {
  name: 'Hero',
  slot: 'MainContentWrapper',
  overridesResolver: (_, styles) => [styles.mainContentWrapper]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const Content = styled(Box, {
  name: 'Hero',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const BackgroundRootContent = styled(ContentModule, {
  name: 'Hero',
  slot: 'BackgroundRootContent',
  overridesResolver: (_, styles) => [styles.backgroundRootContent]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const Overline = styled(Typography, {
  name: 'Hero',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const Title = styled(Typography, {
  name: 'Hero',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: HeroOwnerState }>(() => ({}));

const Subtitle = styled(Typography, {
  name: 'Hero',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const Body = styled(ContentModule, {
  name: 'Hero',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const SideContentWrapper = styled(Box, {
  name: 'Hero',
  slot: 'SideContentWrapper',

  overridesResolver: (_, styles) => [styles.sideContentWrapper]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const BackgroundRoot = styled(Box, {
  name: 'Hero',
  slot: 'BackgroundRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.backgroundRoot]
})<{ ownerState: HeroOwnerState }>``;

const ActionsWrapper = styled(Box, {
  name: 'Hero',
  slot: 'ActionsWrapper',

  overridesResolver: (_, styles) => [styles.actionsWrapper]
})<{ ownerState: HeroOwnerState }>(() => ({}));

const Action = styled(ContentModule, {
  name: 'Hero',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: HeroOwnerState }>(() => ({}));

export default Hero;
