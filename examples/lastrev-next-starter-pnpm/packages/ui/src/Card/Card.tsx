import React from 'react';

import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { default as MuiCardMedia } from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import { getFirstOfArray } from '../utils/getFirstOfArray';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import type { CardProps, CardOwnerState } from './Card.types';
import { type LinkProps } from '../Link';

const Card = (props: CardProps) => {
  const { id, media, overline, className, title, subtitle, body, link, actions, variant, loading, sidekickLookup } =
    props;

  const ownerState = {
    ...props,
    variant
  };

  const image = getFirstOfArray(media);

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} data-testid="Card" {...sidekick(sidekickLookup)} className={className}>
        <CardWrap ownerState={ownerState}>
          {!!link ? <CardLink component={CardActionArea} {...(link as any)} /> : null}

          {image || loading ? (
            // @ts-ignore: TODO
            <CardMedia ownerState={ownerState}>
              {!loading ? (
                <ContentModule
                  __typename="Media"
                  {...sidekick(sidekickLookup, 'media')}
                  {...image}
                  data-testid="Card-media"
                />
              ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
            </CardMedia>
          ) : null}

          {!loading && (overline || title || subtitle || body) ? (
            // @ts-ignore: TODO
            <ContentWrap ownerState={ownerState}>
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
                  component="p"
                  data-testid="Card-title"
                  // @ts-ignore: TODO
                  ownerState={ownerState}>
                  {title}
                </Title>
              ) : null}

              {subtitle ? (
                <Subtitle
                  {...sidekick(sidekickLookup, 'subtitle')}
                  component="p"
                  data-testid="Card-subtitle"
                  // @ts-ignore: TODO
                  ownerState={ownerState}>
                  {subtitle}
                </Subtitle>
              ) : null}

              {body ? (
                <BodyWrap ownerState={ownerState} {...sidekick(sidekickLookup, 'body')}>
                  <Body __typename="RichText" body={body} ownerState={ownerState} data-testid="Card-body" />
                </BodyWrap>
              ) : null}
            </ContentWrap>
          ) : null}

          {loading ? (
            <ContentWrap ownerState={ownerState} data-testid="Card-ContentSkeleton">
              <Overline ownerState={ownerState} variant="overline">
                <Skeleton variant="text" width="100%" />
              </Overline>

              <Title ownerState={ownerState} variant="display5">
                <Skeleton variant="text" width="100%" />
              </Title>

              <Subtitle ownerState={ownerState} variant="display6">
                <Skeleton variant="text" width="100%" />
              </Subtitle>

              <BodyWrap ownerState={ownerState} {...sidekick(sidekickLookup, 'body')}>
                <Body ownerState={ownerState} variant="bodySmall">
                  <Skeleton variant="text" width="100%" />
                </Body>
              </BodyWrap>
            </ContentWrap>
          ) : null}
          {(actions?.length || loading) && (
            <ActionsWrap
              {...sidekick(sidekickLookup, 'actions')}
              data-testid="Card-actions"
              // @ts-ignore: TODO
              ownerState={ownerState}>
              {!loading ? (
                actions?.map((link: any, index: number) => (
                  <Action
                    key={`card-${id}-link-${link?.id || index}`}
                    {...(link as LinkProps)}
                    ownerState={ownerState}
                  />
                ))
              ) : (
                <Skeleton variant="text" width="100%" />
              )}
            </ActionsWrap>
          )}
        </CardWrap>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Card',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: CardOwnerState }>``;

const CardWrap = styled(MuiCard, {
  name: 'Card',
  slot: 'CardWrap',
  overridesResolver: (props, styles) => [styles.cardWrap]
})<{ ownerState: CardOwnerState }>``;

const CardLink = styled(CardActionArea, {
  name: 'Card',
  slot: 'CardLink',
  overridesResolver: (_, styles) => [styles.link]
})<{ ownerState: CardOwnerState }>``;

const CardMedia = styled(MuiCardMedia, {
  name: 'Card',
  slot: 'CardMedia',
  overridesResolver: (_, styles) => [styles.cardMedia]
})<{ ownerState: CardOwnerState }>``;

const ActionsWrap = styled(CardActions, {
  name: 'Card',
  slot: 'ActionsWrap',
  overridesResolver: (_, styles) => [styles.actionsWrap]
})<{ ownerState: CardOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'Card',
  slot: 'CardAction',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: CardOwnerState }>``;

const ContentWrap = styled(CardContent, {
  name: 'Card',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
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

const BodyWrap = styled(Box, {
  name: 'Card',
  slot: 'BodyWrap',
  overridesResolver: (_, styles) => [styles.bodyWrap]
})<{ ownerState: CardOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Card',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: CardOwnerState }>``;

export default Card;
