import React from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import sidekick from '@last-rev/contentful-sidekick-util';
import ContentModule from '../ContentModule';
import { BlockProps } from './Block.types';
import Link, { LinkProps } from '../Link';
import Container from '@mui/material/Container';

export const Block = (props: BlockProps) => {
  const { variant, introText, eyebrow, title, subtitle, body, mediaItems, actions, link, sidekickLookup } = props;

  const extraProps = link
    ? {
        component: Link,
        href: link.href
      }
    : {};

  return (
    <Root data-testid="Block" {...sidekick(sidekickLookup)} {...props} variant={variant}>
      {!!introText && (
        <IntroTextWrapper>
          <IntroText {...sidekick(sidekickLookup, 'introText')} {...introText} />
        </IntroTextWrapper>
      )}

      <ContentOuterWrapper styleVariant={variant}>
        <ContentWrapper>
          <Content>
            {!!eyebrow && <Eyebrow label={eyebrow} />}

            {!!title && (
              <Title {...sidekick(sidekickLookup, 'title')} data-testid="Block-title" component="h2">
                {title}
              </Title>
            )}

            {!!subtitle && (
              <Subtitle {...sidekick(sidekickLookup, 'subtitle')} data-testid="Block-subtitle">
                {subtitle}
              </Subtitle>
            )}

            {!!body && <Body {...sidekick(sidekickLookup, 'body')} __typename="Text" body={body} />}
          </Content>

          {!!actions?.length && (
            <ActionsWrapper {...sidekick(sidekickLookup, 'actions')} data-testid="Block-actions">
              {actions.map((action) => (
                <Action key={action?.id} {...(action as LinkProps)} />
              ))}
            </ActionsWrapper>
          )}
        </ContentWrapper>

        {!!mediaItems && (
          <MediaWrapper {...extraProps} variant={variant}>
            {mediaItems.map((media) => (
              <Media key={media?.id} {...sidekick(sidekickLookup, 'mediaItems')} {...media} />
            ))}
          </MediaWrapper>
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
//   prop !== 'eyebrow' &&
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
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentOuterWrapper]
})<{ styleVariant?: string }>(() => ({}));

const IntroTextWrapper = styled(Box, {
  name: 'Block',
  slot: 'IntroTextWrapper',
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.introTextWrapper]
})(() => ({}));

const IntroText = styled(ContentModule, {
  name: 'Block',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})(() => ({}));

const ContentWrapper = styled(Box, {
  name: 'Block',
  slot: 'ContentWrapper',
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentWrapper]
})<BoxProps<React.ElementType>>(() => ({}));

const Content = styled(Box, {
  name: 'Block',
  slot: 'Content',
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.content]
})<BoxProps<React.ElementType>>(() => ({}));

const Eyebrow = styled(Chip, {
  name: 'Block',
  slot: 'Eyebrow',
  overridesResolver: (_, styles) => [styles.eyebrow]
})(() => ({}));

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

const MediaWrapper = styled(Box, {
  name: 'Block',
  slot: 'MediaWrapper',
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.mediaWrapper]
})<BoxProps<React.ElementType>>(() => ({}));

const Media = styled(ContentModule, {
  name: 'Block',
  slot: 'Media',
  overridesResolver: (_, styles) => [styles.media]
})(() => ({}));

const ActionsWrapper = styled(Box, {
  name: 'Block',
  slot: 'ActionsWrapper',
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.actionsWrapper]
})<BoxProps<React.ElementType>>(() => ({}));

const Action = styled(ContentModule, {
  name: 'Block',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})(() => ({}));

export default Block;
