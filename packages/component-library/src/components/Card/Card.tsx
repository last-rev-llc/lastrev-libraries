import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardActions,
  CardContent,
  Box,
  Typography
} from '@material-ui/core';
import styled from '@material-ui/system/styled';
import Skeleton from '@material-ui/core/Skeleton';
import ErrorBoundary from '../ErrorBoundary';
import Media from '../Media';
import { MediaProps } from '../Media/Media.types';
import Link, { LinkProps } from '../Link';
import Text, { RichText } from '../Text';
import sidekick from '../../utils/sidekick';
import ConditionalWrapper from '../ConditionalWrapper';

export interface CardProps extends MuiCardProps {
  __typename: string;
  loading?: boolean;
  variant?: any;
  title?: string;
  subtitle?: string;
  media?: MediaProps | MediaProps[];
  body?: RichText;
  link?: LinkProps;
  actions?: LinkProps[];
  sidekickLookup: any;
}

export interface CardOverrides {}

export const Card = ({ media, title, subtitle, body, link, actions, variant, loading, sidekickLookup }: CardProps) => {
  return (
    <ErrorBoundary>
      <ConditionalWrapper
        condition={!!link}
        wrapper={(children: any) => (
          <Link noLinkStyle {...link}>
            {children}
          </Link>
        )}>
        <Root variant={variant} {...sidekick(sidekickLookup)}>
          {media || loading ? (
            <Box display="flex" justifyContent="center">
              {!loading ? (
                <Media {...sidekick(sidekickLookup?.media)} {...(Array.isArray(media) ? media[0] : media)} />
              ) : (
                <Skeleton>
                  <Media {...sidekick(sidekickLookup?.media)} {...(Array.isArray(media) ? media[0] : media)} />
                </Skeleton>
              )}
            </Box>
          ) : null}
          {!loading && (title || subtitle || body || actions) ? (
            <CardContent>
              {title ? (
                <Typography {...sidekick(sidekickLookup?.title)} variant="h3" component="h3">
                  {title}
                </Typography>
              ) : null}
              {subtitle ? (
                <Typography {...sidekick(sidekickLookup?.subtitle)} variant="h4" component="h4">
                  {subtitle}
                </Typography>
              ) : null}
              {body ? <Text sidekickLookup={sidekickLookup?.body} body={body} /> : null}
              {actions?.length ? (
                <CardActions {...sidekick(sidekickLookup?.actions)}>
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
              <Skeleton>{body ? <Text sidekickLookup={sidekickLookup?.body} body={body} /> : null}</Skeleton>
              <CardActions>
                <Skeleton width={50} />
              </CardActions>
            </CardContent>
          ) : null}
        </Root>
      </ConditionalWrapper>
    </ErrorBoundary>
  );
};

const Root = styled(MuiCard, {
  name: 'Card',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<MuiCardProps & {}>(() => ({}));

export default Card;
