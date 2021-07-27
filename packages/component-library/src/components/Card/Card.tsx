import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardActions,
  CardContent,
  // CardMedia,
  Box,
  Typography
} from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import Media from '../Media';
import { MediaProps } from '../Media/Media.types';
import Link, { LinkProps } from '../Link';
// import { useTheme } from '@material-ui/core/styles';
import styled from '@material-ui/system/styled';

export interface CardProps extends MuiCardProps {
  __typename: string;
  variant?: any;
  title?: string;
  subtitle?: string;
  media?: MediaProps;
  body?: string;
  actions?: LinkProps[];
}

export interface CardOverrides {}

export const Card = ({ media, title, subtitle, body, actions, variant }: CardProps) => {
  return (
    <ErrorBoundary>
      <CardRoot variant={variant}>
        {media ? (
          // <CardMedia
          //   component={Image}
          //   {...image}
          // />
          <Box>
            <Media {...media} />
          </Box>
        ) : null}
        {title || subtitle || body || actions ? (
          <CardContent>
            {title ? (
              <Typography variant="h3" component="h3">
                {title}
              </Typography>
            ) : null}
            {subtitle ? (
              <Typography variant="h4" component="h4">
                {subtitle}
              </Typography>
            ) : null}
            {body ? (
              <Typography variant="body2" component="p">
                {body}
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
      </CardRoot>
    </ErrorBoundary>
  );
};

const CardRoot = styled(MuiCard, {
  name: 'Card',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<MuiCardProps & {}>(() => ({}));

export default Card;
