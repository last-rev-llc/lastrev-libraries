import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';
import Background from '../Background';

import type { HeroProps, HeroOwnerState } from './Hero.types';

const Hero = (props: HeroProps) => {
  const ownerState = { ...props };

  const { background, backgroundColor, variant, overline, title, subtitle, body, actions, images, sidekickLookup } =
    props;

  return (
    <Root data-testid="Hero" ownerState={ownerState} {...sidekick(sidekickLookup)}>
      <HeroBackground
        background={{ ...background, priority: true }}
        backgroundColor={backgroundColor}
        testId="Hero-background"
      />

      <ContentOuterGrid ownerState={ownerState}>
        {overline || title || subtitle || body || actions ? (
          <MainContentWrap ownerState={ownerState}>
            <Content ownerState={ownerState}>
              {!!overline && (
                <Overline ownerState={ownerState} variant="overline">
                  {overline}
                </Overline>
              )}

              {!!title && (
                <Title
                  {...sidekick(sidekickLookup, 'title')}
                  component="h1"
                  variant="h1"
                  data-testid="Hero-title"
                  ownerState={ownerState}>
                  {title}
                </Title>
              )}

              {!!subtitle && (
                <Subtitle
                  {...sidekick(sidekickLookup, 'subtitle')}
                  data-testid="Hero-subtitle"
                  ownerState={ownerState}
                  variant="body1">
                  {subtitle}
                </Subtitle>
              )}

              {!!body && (
                <Body __typename="RichText" ownerState={ownerState} body={body} {...sidekick(sidekickLookup, 'body')} />
              )}
            </Content>

            {!!actions?.length && (
              <ActionsWrap {...sidekick(sidekickLookup, 'actions')} data-testid="Hero-actions" ownerState={ownerState}>
                {actions.map((action) => (
                  <Action ownerState={ownerState} key={action?.id} {...action} />
                ))}
              </ActionsWrap>
            )}
          </MainContentWrap>
        ) : null}

        {!!images?.length ? (
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
      </ContentOuterGrid>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Hero',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: HeroOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Hero',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: HeroOwnerState }>``;

const MainContentWrap = styled('div', {
  name: 'Hero',
  slot: 'MainContentWrap',
  overridesResolver: (_, styles) => [styles.mainContentWrap]
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
})<TypographyProps & { ownerState: HeroOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Hero',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps & { ownerState: HeroOwnerState }>``;

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

const ActionsWrap = styled(Box, {
  name: 'Hero',
  slot: 'ActionsWrap',
  overridesResolver: (_, styles) => [styles.actionsWrap]
})<{ ownerState: HeroOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'Hero',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: HeroOwnerState }>``;

export default Hero;
