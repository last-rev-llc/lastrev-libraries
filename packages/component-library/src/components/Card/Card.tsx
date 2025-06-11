import React from 'react';
import {
  Box,
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Chip
} from '@mui/material';
import styled from '@mui/system/styled';
import Skeleton from '@mui/material/Skeleton';

import ErrorBoundary from '../ErrorBoundary';

import { LinkProps } from '../Link';
import ContentModule from '../ContentModule';
import sidekick from 'packages/cms-sidekick-util/dist';
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
        {!!link ? <CardLink __typename="Link" noLinkStyle {...(link as any)} passHref data-testid="Card-link" /> : null}
        {media || loading ? (
          <CardMedia sx={{ display: 'block', position: 'relative', width: '100%' }}>
            {!loading ? (
              <ContentModule
                __typename="Media"
                {...sidekick(sidekickLookup, 'media')}
                {...getFirstOfArray(media)}
                data-testid="Card-media"
              />
            ) : (
              <Skeleton>
                <ContentModule {...sidekick(sidekickLookup, 'media')} {...getFirstOfArray(media)} testId="Card-media" />
              </Skeleton>
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
              <Typography {...sidekick(sidekickLookup, 'title')} variant="h3" component="h3" data-testid="Card-title">
                {title}
              </Typography>
            ) : null}
            {subtitle ? (
              <Typography
                {...sidekick(sidekickLookup, 'subtitle')}
                variant="h4"
                component="h4"
                data-testid="Card-subtitle">
                {subtitle}
              </Typography>
            ) : null}
            {body ? (
              <ContentModule
                __typename="Text"
                variant="card"
                {...sidekick(sidekickLookup, 'body')}
                body={body}
                data-testid="Card-body"
              />
            ) : null}
            {actions?.length ? (
              <CardActions {...sidekick(sidekickLookup, 'actions')} data-testid="Card-actions">
                {actions?.map((link) => (
                  <ContentModule __typename="Link" key={link.id} {...link} />
                ))}
              </CardActions>
            ) : null}
          </CardContent>
        ) : null}
        {loading ? (
          <CardContent data-testid="Card-ContentSkeleton">
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

const CardTagRoot = styled(ContentModule, { name: 'Card', slot: 'TagRoot' })``;

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
const CardTags = styled(Box, {
  name: 'Card',
  slot: 'Tags',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.cardTags]
})<{}>`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
`;

const CardLink = styled(ContentModule, {
  name: 'Card',
  slot: 'CardLink',
  overridesResolver: (_, styles) => [styles.cardLink]
})<LinkProps & {}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default Card;
