import React from 'react';

import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { CardProps } from './Card.types';
import Link from '../Link';
import { LinkProps } from '../Link/Link.types';

import getFirstOfArray from '../utils/getFirstOfArray';
import useThemeProps from '../utils/useThemeProps';

export const Card = (inProps: CardProps) => {
  const props: CardProps = useThemeProps({
    name: 'Card',
    props: inProps
  });
  const { id, media, eyebrow, title, subtitle, body, link, actions, variant, loading, position, sidekickLookup } =
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
          <Media ownerState={ownerState}>
            {eyebrow ? (
              <Eyebrow
                {...sidekick(sidekickLookup, 'eyebrow')}
                data-testid="Card-eyebrow"
                // @ts-ignore: TODO
                ownerState={ownerState}>
                {eyebrow}
              </Eyebrow>
            ) : null}
            {!loading && media?.length !== 2 && (
              <ContentModule {...sidekick(sidekickLookup, 'media')} {...image} data-testid="Card-media" />
            )}
            {loading && (
              <Skeleton>
                <ContentModule {...sidekick(sidekickLookup, 'media')} {...image} testId="Card-media" />
              </Skeleton>
            )}
          </Media>
        ) : null}

        {!loading && (title || subtitle || body || actions) ? (
          // @ts-ignore: TODO
          <Content ownerState={ownerState}>
            {eyebrow ? (
              <Eyebrow
                {...sidekick(sidekickLookup, 'eyebrow')}
                data-testid="Card-eyebrow"
                // @ts-ignore: TODO
                ownerState={ownerState}>
                {eyebrow}
              </Eyebrow>
            ) : null}

            {title ? (
              <Title
                {...sidekick(sidekickLookup, 'title')}
                variant="h3"
                data-testid="Card-title"
                // @ts-ignore: TODO
                ownerState={ownerState}>
                {title}
              </Title>
            ) : null}

            {subtitle ? (
              <Subtitle
                {...sidekick(sidekickLookup, 'subtitle')}
                variant="h4"
                data-testid="Card-subtitle"
                // @ts-ignore: TODO
                ownerState={ownerState}>
                {subtitle}
              </Subtitle>
            ) : null}

            {body ? (
              <Body
                __typename="Text"
                variant="card"
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
            <Typography>
              <Skeleton width="100%" />
            </Typography>

            <Typography variant="h3" component="h3">
              <Skeleton width="100%" />
            </Typography>

            <Typography variant="h4" component="h4">
              <Skeleton width="100%" />
              <br />
              <Skeleton width="100%" />
            </Typography>

            <Skeleton>
              {body ? (
                <ContentModule
                  __typename="Text"
                  variant="card"
                  {...sidekick(sidekickLookup, 'body')}
                  body={body}
                  data-testid="Card-body"
                />
              ) : null}
            </Skeleton>

            <CardActions>
              <Skeleton width={50} />
            </CardActions>
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
  prop !== 'eyebrow' &&
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

  overridesResolver: (_, styles) => [styles.cardLink]
})(() => ({}));

const Media = styled(CardMedia, {
  name: 'Card',
  slot: 'CardMedia',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.cardMedia]
})(() => ({}));

const Actions = styled(CardActions, {
  name: 'Card',
  slot: 'CardActions',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.cardActions]
})(() => ({}));

const Action = styled(ContentModule, {
  name: 'Card',
  slot: 'CardAction',
  overridesResolver: (_, styles) => [styles.cardAction]
})(() => ({}));

const Content = styled(CardContent, {
  name: 'Card',
  slot: 'CardContent',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.cardContent]
})(() => ({}));

const Eyebrow = styled(Typography, {
  name: 'Card',
  slot: 'Eyebrow',
  overridesResolver: (_, styles) => [styles.eyebrow]
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
