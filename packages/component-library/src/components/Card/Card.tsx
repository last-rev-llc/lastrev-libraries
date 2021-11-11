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
import Media from '../Media';
import { MediaProps } from '../Media/Media.types';
import Link, { LinkProps } from '../Link';
import Text, { RichText } from '../Text';
import sidekick from '../../utils/sidekick';
import getFirstOfArray from '../../utils/getFirstOfArray';

export interface CardProps extends MuiCardProps {
  __typename?: string;
  loading?: boolean;
  variant?: any;
  title?: string;
  subtitle?: string;
  media?: MediaProps | MediaProps[];
  body?: RichText;
  link?: LinkProps;
  actions?: LinkProps[];
  tags?: LinkProps[];
  sidekickLookup: any;
}

export interface CardOverrides {}

export const Card = ({
  media,
  title,
  subtitle,
  body,
  link,
  tags,
  actions,
  variant,
  loading,
  sidekickLookup,
  ...props
}: CardProps) => {
  return (
    <ErrorBoundary>
      <Root variant={variant} data-testid="Card" {...sidekick(sidekickLookup)} {...(props as any)}>
        {!!link ? <CardLink __typename="Link" noLinkStyle href={link?.href} /> : null}
        {media || loading ? (
          <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
            {!loading ? (
              <Media {...sidekick(sidekickLookup?.media)} {...getFirstOfArray(media)} testId="Card-media" />
            ) : (
              <Skeleton>
                <Media {...sidekick(sidekickLookup?.media)} {...getFirstOfArray(media)} testId="Card-media" />
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
              <Typography {...sidekick(sidekickLookup?.title)} variant="h3" component="h3" data-testid="Card-title">
                {title}
              </Typography>
            ) : null}
            {subtitle ? (
              <Typography
                {...sidekick(sidekickLookup?.subtitle)}
                variant="h4"
                component="h4"
                data-testid="Card-subtitle"
              >
                {subtitle}
              </Typography>
            ) : null}
            {body ? <Text sidekickLookup={sidekickLookup?.body} body={body} data-testid="Card-body" /> : null}
            {actions?.length ? (
              <CardActions {...sidekick(sidekickLookup?.actions)} data-testid="Card-actions">
                {actions?.map((link) => (
                  <Link key={link.id} {...link} />
                ))}
              </CardActions>
            ) : null}
          </CardContent>
        ) : null}
        {loading ? (
          <CardContent>
            <Typography variant="h3" component="h3">
              <Skeleton width="100%" />
            </Typography>
            <Typography variant="h4" component="h4">
              <Skeleton width="100%" />
              <br />
              <Skeleton width="100%" />
            </Typography>
            <Skeleton>
              {body ? <Text sidekickLookup={sidekickLookup?.body} body={body} data-testid="Card-body" /> : null}
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

const CardTagRoot = styled(Link, { name: 'Card', slot: 'TagRoot' })``;

const Root = styled(MuiCard, {
  name: 'Card',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<MuiCardProps & {}>`
  position: relative;
`;
const CardTags = styled(Box, {
  name: 'Card',
  slot: 'Tags',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.cardTags]
})<{}>`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
`;

const CardLink = styled(Link, {
  name: 'Card',
  slot: 'CardLink',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.cardLink]
})<LinkProps & {}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default Card;
