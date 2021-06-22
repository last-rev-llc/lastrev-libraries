import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardActions,
  CardContent,
  Link,
  Typography
} from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import { LinkProps } from '../Link/Link.types';

interface CardProps extends MuiCardProps {
  title?: string
  subtitle?: string
  body?: string
  ctas?: LinkProps[]
}

export const Card = ({
  title = 'Title',
  subtitle = 'Subtitle',
  body = 'Grayscale wireframe with elements in storybook',
}: CardProps) => {
  return (
    <ErrorBoundary>
      <MuiCard>
        <CardContent>
          {title && (
            <Typography variant="h4" component="h3">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="h5" component="h4">
              {subtitle}
            </Typography>
          )}
          {body && (
            <Typography variant="body2" component="p">
              {body}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Link>Learn More</Link>
        </CardActions>
      </MuiCard>
    </ErrorBoundary>
  );
};

export default Card;
