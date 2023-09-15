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

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import Link from '../Link';

import { CardProps } from './Card.types';
import { LinkProps } from '../Link/Link.types';

import getFirstOfArray from '../utils/getFirstOfArray';
import useThemeProps from '../utils/useThemeProps';

export const Card = (inProps: CardProps) => {
  const props: CardProps = useThemeProps({
    name: 'Card',
    props: inProps
  });
  const { id, media, overline, title, subtitle, body, link, actions, variant, loading, position, sidekickLookup } =
    props;

  const image = getFirstOfArray(media);

  const ownerState = {
    variant,
    isFirst: position === 1,
    isMultipleOfTwo: position && position > 1 && position % 2 === 0,
    isMultipleOfThree: position && position > 1 && position % 3 === 0
  };

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} data-testid="Card" {...sidekick(sidekickLookup)} {...(props as any)}>
        {!!link ? <CardLink component={Link} noLinkStyle {...(link as any)} /> : null}
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

            {actions?.length ? (
              <Actions
                {...sidekick(sidekickLookup, 'actions')}
                data-testid="Card-actions"
                // @ts-ignore: TODO
                ownerState={ownerState}>
                {actions?.map((link: any, index: number) => (
                  <Action
                    key={`card-${id}-link-${link?.id || index}`}
                    {...(link as LinkProps)}
                    ownerState={ownerState}
                  />
                ))}
              </Actions>
            ) : null}
          </Content>
        ) : null}

        {loading ? (
          <Content data-testid="Card-ContentSkeleton">
            <Overline variant="overline">
              <Skeleton width="100%" />
            </Overline>

            <Title variant="display5">
              <Skeleton width="100%" />
            </Title>

            <Subtitle variant="display6">
              <Skeleton width="100%" />
            </Subtitle>

            <Body variant="bodySmall">
              <Skeleton width="100%" />
            </Body>

            <Actions>
              <Skeleton width="100%" />
            </Actions>
          </Content>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'sidekickLookup' &&
  prop !== 'body' &&
  prop !== 'subtitle' &&
  prop !== 'media' &&
  prop !== 'actions' &&
  prop !== 'link' &&
  prop !== 'overline' &&
  prop !== 'ownerState' &&
  prop !== 'noLinkStyle' &&
  prop !== 'title' &&
  prop !== 'colorScheme' &&
  prop !== 'categories';

const Root = styled(MuiCard, {
  name: 'Card',
  slot: 'Root',
  shouldForwardProp: (prop) => shouldForwardProp(prop as string) && prop !== 'id',
  overridesResolver: (_, styles) => [styles.root]
})<CardProps>(() => ({}));

const CardLink = styled(CardActionArea, {
  name: 'Card',
  slot: 'CardLink',

  overridesResolver: (_, styles) => [styles.link]
})(() => ({}));

const CardMedia = styled(MuiCardMedia, {
  name: 'Card',
  slot: 'CardMedia',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.media]
})(() => ({}));

const Actions = styled(CardActions, {
  name: 'Card',
  slot: 'Actions',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.actions]
})(() => ({}));

const Action = styled(ContentModule, {
  name: 'Card',
  slot: 'CardAction',
  overridesResolver: (_, styles) => [styles.action]
})(() => ({}));

const Content = styled(CardContent, {
  name: 'Card',
  slot: 'Content',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.content]
})(() => ({}));

const Overline = styled(Typography, {
  name: 'Card',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})(() => ({}));

const Title = styled(Typography, {
  name: 'Card',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})(() => ({}));

const Subtitle = styled(Typography, {
  name: 'Card',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})(() => ({}));

const Body = styled(ContentModule, {
  name: 'Card',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})(() => ({}));

export default Card;
