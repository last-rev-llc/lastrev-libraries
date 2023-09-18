import React from 'react';

import { styled } from '@mui/material/styles';

import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Container, { ContainerProps } from '@mui/material/Container';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';

import Link, { LinkProps } from '../Link';
import { BlockProps } from './Block.types';

const Block = (props: BlockProps) => {
  const { variant, introText, overline, title, subtitle, body, mediaItems, actions, link, sidekickLookup } = props;

  const extraProps = link
    ? {
        component: Link,
        href: link.href
      }
    : {};

  // TODO: Better way?
  const isFullBleed = variant?.indexOf('FullBleed') > -1;

  return (
    <Root data-testid="Block" {...sidekick(sidekickLookup)} {...props} variant={variant}>
      {!!introText && (
        <IntroTextWrapper>
          <IntroText {...sidekick(sidekickLookup, 'introText')} {...introText} variant="introText" />
        </IntroTextWrapper>
      )}

      <ContentOuterWrapper maxWidth={isFullBleed ? false : undefined} disableGutters={isFullBleed}>
        {overline || title || subtitle || body || actions ? (
          <MainContentWrapper variant={variant} maxWidth={false} sx={{ p: 0 }}>
            <Content>
              {!!overline && <Overline variant="overline">{overline}</Overline>}

              {!!title && (
                <Title {...sidekick(sidekickLookup, 'title')} data-testid="Block-title" variant="display3">
                  {title}
                </Title>
              )}

              {!!subtitle && (
                <Subtitle {...sidekick(sidekickLookup, 'subtitle')} data-testid="Block-subtitle" variant="display4">
                  {subtitle}
                </Subtitle>
              )}

              {!!body && <Body {...sidekick(sidekickLookup, 'body')} __typename="Text" body={body} />}
            </Content>

            {!!actions?.length && (
              <ActionsWrapper {...sidekick(sidekickLookup, 'actions')} data-testid="Block-actions">
                {actions.map((action: LinkProps) => (
                  <Action key={action?.id} {...(action as LinkProps)} />
                ))}
              </ActionsWrapper>
            )}
          </MainContentWrapper>
        ) : null}

        {!!mediaItems && (
          <SideContentWrapper {...extraProps} variant={variant} maxWidth={false} disableGutters={isFullBleed}>
            {mediaItems.map((media) => (
              <Media key={media?.id} {...sidekick(sidekickLookup, 'mediaItems')} {...media} />
            ))}
          </SideContentWrapper>
        )}
      </ContentOuterWrapper>
    </Root>
  );
};

// const shouldForwardProp = (prop: string) =>
//   prop !== 'variant' &&
//   prop !== 'sidekickLookup' &&
//   prop !== 'body' &&
//   prop !== 'subtitle' &&
//   prop !== 'actions' &&
//   prop !== 'media' &&
//   prop !== 'introText' &&
//   prop !== 'overline' &&
//   prop !== 'ownerState' &&
//   prop !== 'title' &&
//   prop !== 'blockVariant';

const Root = styled(Box, {
  name: 'Block',
  slot: 'Root',
  // shouldForwardProp: (prop) => shouldForwardProp(prop as string) && prop !== 'id',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; colorScheme?: string }>(() => ({}));

const ContentOuterWrapper = styled(Container, {
  name: 'Block',
  slot: 'ContentOuterWrapper',
  overridesResolver: (_, styles) => [styles.contentOuterWrapper]
})<ContainerProps<React.ElementType>>(() => ({}));

const IntroTextWrapper = styled(Box, {
  name: 'Block',
  slot: 'IntroTextWrapper',
  overridesResolver: (_, styles) => [styles.introTextWrapper]
})(() => ({}));

const IntroText = styled(ContentModule, {
  name: 'Block',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})(() => ({}));

const MainContentWrapper = styled(Container, {
  name: 'Block',
  slot: 'MainContentWrapper',
  overridesResolver: (_, styles) => [styles.mainContentWrapper]
})<ContainerProps<React.ElementType>>(() => ({}));

const Content = styled(Box, {
  name: 'Block',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})<BoxProps<React.ElementType>>(() => ({}));

const Overline = styled(Typography, {
  name: 'Block',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<TypographyProps<React.ElementType>>(() => ({}));

const Title = styled(Typography, {
  name: 'Block',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps<React.ElementType>>(() => ({}));

const Subtitle = styled(Typography, {
  name: 'Block',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps<React.ElementType>>(() => ({}));

const Body = styled(ContentModule, {
  name: 'Block',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})(() => ({}));

const SideContentWrapper = styled(Container, {
  name: 'Block',
  slot: 'SideContentWrapper',

  overridesResolver: (_, styles) => [styles.sideContentWrapper]
})<ContainerProps<React.ElementType>>(() => ({}));

const Media = styled(ContentModule, {
  name: 'Block',
  slot: 'Media',
  overridesResolver: (_, styles) => [styles.media]
})(() => ({}));

const ActionsWrapper = styled(Box, {
  name: 'Block',
  slot: 'ActionsWrapper',

  overridesResolver: (_, styles) => [styles.actionsWrapper]
})<BoxProps<React.ElementType>>(() => ({}));

const Action = styled(ContentModule, {
  name: 'Block',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})(() => ({}));

export default Block;
