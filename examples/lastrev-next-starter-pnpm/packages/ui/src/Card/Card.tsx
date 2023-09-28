import React from 'react';

import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { default as MuiCardMedia } from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import sidekick from '@last-rev/contentful-sidekick-util';

import getFirstOfArray from '../utils/getFirstOfArray';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import type { CardProps, CardOwnerState } from './Card.types';
import type { LinkProps } from '../Link/Link.types';

export const Card = (props: CardProps) => {
  const { id, media, overline, title, subtitle, body, link, actions, variant, loading, position, sidekickLookup } =
    props;

  const ownerState = {
    ...props,
    variant,
    isFirst: position === 1,
    isMultipleOfTwo: !!position && position > 1 && position % 2 === 0,
    isMultipleOfThree: !!position && position > 1 && position % 3 === 0
  };

  const image = getFirstOfArray(media);

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} data-testid="Card" {...sidekick(sidekickLookup)}>
        {!!link ? <CardLink component={CardActionArea} {...(link as any)} /> : null}
        {image || loading ? (
          // @ts-ignore: TODO
          <CardMedia ownerState={ownerState}>
            {!loading && (
              <ContentModule
                __typename="Media"
                {...sidekick(sidekickLookup, 'media')}
                {...image}
                data-testid="Card-media"
              />
            )}

            {loading && <Skeleton>TODO Image Placeholder</Skeleton>}
          </CardMedia>
        ) : null}

        {!loading && (overline || title || subtitle || body || actions) ? (
          // @ts-ignore: TODO
          <Content ownerState={ownerState}>
            {overline ? (
              <Overline
                {...sidekick(sidekickLookup, 'overline')}
                variant="overline"
                data-testid="Card-overline"
                // @ts-ignore: TODO
                ownerState={ownerState}>
                {overline}
              </Overline>
            ) : null}

            {title ? (
              <Title
                {...sidekick(sidekickLookup, 'title')}
                variant="display5"
                data-testid="Card-title"
                // @ts-ignore: TODO
                ownerState={ownerState}>
                {title}
              </Title>
            ) : null}

            {subtitle ? (
              <Subtitle
                {...sidekick(sidekickLookup, 'subtitle')}
                variant="display6"
                data-testid="Card-subtitle"
                // @ts-ignore: TODO
                ownerState={ownerState}>
                {subtitle}
              </Subtitle>
            ) : null}

            {body ? (
              <Body
                __typename="Text"
                variant="bodySmall"
                {...sidekick(sidekickLookup, 'body')}
                body={body}
                ownerState={ownerState}
                data-testid="Card-body"
              />
            ) : null}
          </Content>
        ) : null}
        {actions?.length ? (
          <Actions
            {...sidekick(sidekickLookup, 'actions')}
            data-testid="Card-actions"
            // @ts-ignore: TODO
            ownerState={ownerState}>
            {actions?.map((link: any, index: number) => (
              <Action key={`card-${id}-link-${link?.id || index}`} {...(link as LinkProps)} ownerState={ownerState} />
            ))}
          </Actions>
        ) : null}
        {loading ? (
          <Content ownerState={ownerState} data-testid="Card-ContentSkeleton">
            <Overline ownerState={ownerState} variant="overline">
              <Skeleton width="100%" />
            </Overline>

            <Title ownerState={ownerState} variant="display5">
              <Skeleton width="100%" />
            </Title>

            <Subtitle ownerState={ownerState} variant="display6">
              <Skeleton width="100%" />
            </Subtitle>

            <Body ownerState={ownerState} variant="bodySmall">
              <Skeleton width="100%" />
            </Body>

            <Actions ownerState={ownerState}>
              <Skeleton width="100%" />
            </Actions>
          </Content>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(MuiCard, {
  name: 'Card',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: CardOwnerState }>``;

const CardLink = styled(CardActionArea, {
  name: 'Card',
  slot: 'CardLink',
  overridesResolver: (_, styles) => [styles.link]
})<{ ownerState: CardOwnerState }>``;

const CardMedia = styled(MuiCardMedia, {
  name: 'Card',
  slot: 'CardMedia',
  overridesResolver: (_, styles) => [styles.media]
})<{ ownerState: CardOwnerState }>``;

const Actions = styled(CardActions, {
  name: 'Card',
  slot: 'Actions',
  overridesResolver: (_, styles) => [styles.actions]
})<{ ownerState: CardOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'Card',
  slot: 'CardAction',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: CardOwnerState }>``;

const Content = styled(CardContent, {
  name: 'Card',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})<{ ownerState: CardOwnerState }>``;

const Overline = styled(Typography, {
  name: 'Card',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<{ ownerState: CardOwnerState }>``;

const Title = styled(Typography, {
  name: 'Card',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<{ ownerState: CardOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Card',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<{ ownerState: CardOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Card',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: CardOwnerState }>``;

export default Card;
