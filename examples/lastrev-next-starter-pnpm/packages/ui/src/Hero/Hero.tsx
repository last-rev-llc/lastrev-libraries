import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';
import Background from '../Background';

import type { HeroProps, HeroOwnerState } from './Hero.types';

export const Hero = (props: HeroProps) => {
  const ownerState = { ...props };
  const { background, backgroundColor, overline, title, subtitle, body, actions, images, sidekickLookup } = props;

  return (
    <Root data-testid="Hero" ownerState={ownerState} {...sidekick(sidekickLookup)}>
      <HeroBackground
        background={{ ...background, priority: true }}
        backgroundColor={backgroundColor}
        testId="Hero-background"
      />

      <ContentGrid ownerState={ownerState}>
        {overline || title || subtitle || body || actions ? (
          <Content ownerState={ownerState}>
            {!!overline && (
              <Overline ownerState={ownerState} variant="overline">
                {overline}
              </Overline>
            )}

            {!!title && (
              <Title
                {...sidekick(sidekickLookup, 'title')}
                // @ts-expect-error TODO: Fix this
                component="h1"
                data-testid="Hero-title"
                ownerState={ownerState}
                variant="display1">
                {title}
              </Title>
            )}

            {!!subtitle && (
              <Subtitle
                {...sidekick(sidekickLookup, 'subtitle')}
                data-testid="Hero-subtitle"
                ownerState={ownerState}
                variant="display3">
                {subtitle}
              </Subtitle>
            )}

            {!!body && (
              <Body __typename="Text" {...sidekick(sidekickLookup, 'body')} ownerState={ownerState} body={body} />
            )}
            {!!actions?.length && (
              <ActionsWrapper
                {...sidekick(sidekickLookup, 'actions')}
                data-testid="Hero-actions"
                ownerState={ownerState}>
                {actions.map((action) => (
                  <Action ownerState={ownerState} key={action?.id} {...action} />
                ))}
              </ActionsWrapper>
            )}
          </Content>
        ) : null}

        {images?.length ? (
          <MediaWrap>
            {images?.map((image) => (
              <Media
                key={image?.id}
                ownerState={ownerState}
                {...sidekick(sidekickLookup, 'images')}
                {...image}
                data-testid="Hero-media"
              />
            ))}
          </MediaWrap>
        ) : null}
      </ContentGrid>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Hero',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: HeroOwnerState }>``;

const ContentGrid = styled(Grid, {
  name: 'Hero',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: HeroOwnerState }>``;

const Content = styled(Box, {
  name: 'Hero',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})<{ ownerState: HeroOwnerState }>``;

const HeroBackground = styled(Background, {
  name: 'Hero',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const Overline = styled(Typography, {
  name: 'Hero',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<{ ownerState: HeroOwnerState }>``;

const Title = styled(Typography, {
  name: 'Hero',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<{ ownerState: HeroOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Hero',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<{ ownerState: HeroOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Hero',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: HeroOwnerState }>``;

const Media = styled(ContentModule, {
  name: 'Hero',
  slot: 'Media ',
  overridesResolver: (_, styles) => [styles.media]
})<{ ownerState: HeroOwnerState }>``;

const MediaWrap = styled(Box, {
  name: 'Hero',
  slot: 'MediaWrap ',
  overridesResolver: (_, styles) => [styles.mediaWrap]
})``;

const ActionsWrapper = styled(Box, {
  name: 'Hero',
  slot: 'ActionsWrapper',
  overridesResolver: (_, styles) => [styles.actionsWrapper]
})<{ ownerState: HeroOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'Hero',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: HeroOwnerState }>``;

export default Hero;
