import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardActions,
  CardContent,
  Box,
  Typography
} from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import Media from '../Media';
import { MediaProps } from '../Media/Media.types';
import Link, { LinkProps } from '../Link';
import styled from '@material-ui/system/styled';
import sidekick from '../../utils/sidekick';

export interface CardProps extends MuiCardProps {
  __typename: string;
  variant?: any;
  title?: string;
  subtitle?: string;
  media?: MediaProps | MediaProps[];
  body?: string;
  cardBody?: string;
  actions?: LinkProps[];
  sidekickLookup: any;
}

export interface CardOverrides {}

export const Card = ({ media, title, subtitle, body, cardBody, actions, variant, sidekickLookup }: CardProps) => {
  return (
    <ErrorBoundary>
      <Root variant={variant} {...sidekick(sidekickLookup)}>
        {media ? (
          // <CardMedia
          //   component={Image}
          //   {...image}
          // />
          <Box display="flex" justifyContent="center">
            <Media {...sidekick(sidekickLookup?.media)} {...(Array.isArray(media) ? media[0] : media)} />
          </Box>
        ) : null}
        {title || subtitle || body || actions ? (
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
            {body ?? cardBody ? (
              <Typography {...sidekick(sidekickLookup?.body)} variant="body2" component="p">
                {body ?? cardBody}
              </Typography>
            ) : null}
            {actions?.length ? (
              <CardActions>
                {actions?.map((link) => (
                  <Link {...link} />
                ))}
              </CardActions>
            ) : null}
          </CardContent>
        ) : null}
      </Root>
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
