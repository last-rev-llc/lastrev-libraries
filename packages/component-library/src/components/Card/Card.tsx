import React from 'react';
import {
  Box,
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardMedia as MuiCardMedia,
  CardActions as MuiCardActions,
  CardContent as MuiCardContent,
  Typography,
  Chip as MuiChip
} from '@mui/material';
import styled from '@mui/system/styled';
import MuiSkeleton from '@mui/material/Skeleton';

import ErrorBoundary from '../ErrorBoundary';
import { LinkProps } from '../Link';
import ContentModule from '../ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';
import getFirstOfArray from '../../utils/getFirstOfArray';
import { CardProps } from './Card.types';
import useThemeProps from '../../utils/useThemeProps';

export const Card = (inProps: CardProps) => {
  const props = useThemeProps({
    name: 'Card',
    props: inProps
  });
  const { media, title, subtitle, body, link, tags, actions, variant, loading, sidekickLookup } = props;

  return (
    <ErrorBoundary>
      <Root variant={variant} data-testid="Card" {...sidekick(sidekickLookup)} {...(props as any)}>
        {!!link ? <CardLink __typename="Link" noLinkStyle {...(link as any)} /> : null}
        {media || loading ? (
          <CardMedia sx={{ display: 'block', position: 'relative', width: '100%' }}>
            {!loading ? (
              <Media
                __typename="Media"
                {...sidekick(sidekickLookup?.media)}
                {...getFirstOfArray(media)}
                data-testid="Card-media"
              />
            ) : (
              <MediaSkeleton>
                <Media {...sidekick(sidekickLookup?.media)} {...getFirstOfArray(media)} testId="Card-media" />
              </MediaSkeleton>
            )}
          </CardMedia>
        ) : null}
        {tags?.length ? (
          <CardTags>
            {tags?.map((tag) => (
              <CardTag {...tag} />
            ))}
          </CardTags>
        ) : null}
        {!loading && (title || subtitle || body || actions) ? (
          <CardContent>
            {title ? (
              <CardTitle {...sidekick(sidekickLookup?.title)} variant="h3" data-testid="Card-title">
                {title}
              </CardTitle>
            ) : null}
            {subtitle ? (
              <CardSubtitle {...sidekick(sidekickLookup?.subtitle)} variant="h4" data-testid="Card-subtitle">
                {subtitle}
              </CardSubtitle>
            ) : null}
            {body ? (
              <CardBody
                __typename="Text"
                variant="card"
                sidekickLookup={sidekickLookup?.body}
                body={body}
                data-testid="Card-body"
              />
            ) : null}
            {actions?.length ? (
              <CardActions {...sidekick(sidekickLookup?.actions)} data-testid="Card-actions">
                {actions?.map((link) => (
                  <CardButton __typename="Link" key={link.id} {...link} />
                ))}
              </CardActions>
            ) : null}
          </CardContent>
        ) : null}
        {loading ? (
          <CardContent data-testid="Card-ContentSkeleton">
            <CardTitle variant="h3">
              <TitleSkeleton width="100%" />
            </CardTitle>
            <CardSubtitle variant="h4">
              <SubtitleSkeleton width="100%" />
              <br />
              <SubtitleSkeleton width="100%" />
            </CardSubtitle>
            <TextSkeleton>
              {body ? (
                <CardBody
                  __typename="Text"
                  variant="card"
                  sidekickLookup={sidekickLookup?.body}
                  body={body}
                  data-testid="Card-body"
                />
              ) : null}
            </TextSkeleton>
            <CardActions>
              <ActionsSkeleton width={50} />
            </CardActions>
          </CardContent>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const CardTag = ({ href, text }: LinkProps) =>
  !href || href === '#' ? (
    <Chip label={text} />
  ) : (
    <CardTagRoot __typename="Link" href={href}>
      <Chip label={text} clickable />
    </CardTagRoot>
  );

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'sidekickLookup' &&
  prop !== 'body' &&
  prop !== 'subtitle' &&
  prop !== 'actions' &&
  prop !== 'media' &&
  prop !== 'actions' &&
  prop !== 'link' &&
  prop != '__typename';

const Root = styled(MuiCard, {
  name: 'Card',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<MuiCardProps & {}>`
  position: relative;
`;

const CardLink = styled(ContentModule, {
  name: 'Card',
  slot: 'Link',
  overridesResolver: (_, styles) => [styles.link]
})<LinkProps & {}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CardMedia = styled(MuiCardMedia, {
  name: 'Card',
  slot: 'MediaRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.mediaRoot]
})``;

const Media = styled(ContentModule, {
  name: 'Card',
  slot: 'Media',
  overridesResolver: (_, styles) => [styles.media]
})``;

const MediaSkeleton = styled(MuiSkeleton, {
  name: 'Card',
  slot: 'MediaSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.mediaSkeleton]
})``;

const CardTags = styled(Box, {
  name: 'Card',
  slot: 'Tags',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.tags]
})<{}>`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Chip = styled(MuiChip, {
  name: 'Card',
  slot: 'Chip',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.chip]
})``;

const CardTagRoot = styled(ContentModule, {
  name: 'Card',
  slot: 'TagRoot',
  overridesResolver: (_, styles) => [styles.tagRoot]
})``;

const CardContent = styled(MuiCardContent, {
  name: 'Card',
  slot: 'Content',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.content]
})``;

const CardTitle = styled(Typography, {
  name: 'Card',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})``;

const CardSubtitle = styled(Typography, {
  name: 'Card',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})``;

const CardBody = styled(ContentModule, {
  name: 'Card',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})``;

const CardActions = styled(MuiCardActions, {
  name: 'Card',
  slot: 'Actions',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.actions]
})``;

const CardButton = styled(ContentModule, {
  name: 'Card',
  slot: 'Button',
  overridesResolver: (_, styles) => [styles.button]
})``;

const TitleSkeleton = styled(MuiSkeleton, {
  name: 'Card',
  slot: 'TitleSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.titleSkeleton]
})``;

const SubtitleSkeleton = styled(MuiSkeleton, {
  name: 'Card',
  slot: 'SubtitleSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.subtitleSkeleton]
})``;

const TextSkeleton = styled(MuiSkeleton, {
  name: 'Card',
  slot: 'TextSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.textSkeleton]
})``;

const ActionsSkeleton = styled(MuiSkeleton, {
  name: 'Card',
  slot: 'ActionsSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.actionsSkeleton]
})``;

export default Card;
