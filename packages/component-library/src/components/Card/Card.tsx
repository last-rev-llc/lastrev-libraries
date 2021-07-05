import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardActions,
  CardContent,
  // CardMedia,
  Link,
  Typography
} from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import { ImageProps } from '../Image/Image.types';
import { LinkProps } from '../Link/Link.types';
import { useTheme } from '@material-ui/core/styles';

interface CardProps extends MuiCardProps {
  image: ImageProps;
  title?: string;
  subtitle?: string;
  body?: string;
  ctas?: LinkProps[];
}

export const Card = ({ image, title, subtitle, body, ctas }: CardProps) => {
  return (
    <ErrorBoundary>
      <MuiCard>
        {image ? (
          // <CardMedia
          //   component={Image}
          //   {...image}
          // />
          <Image {...image} height="100" />
        ) : null}
        <CardContent>
          {title ? (
            <Typography variant="h4" component="h3">
              {title}
            </Typography>
          ) : null}
          {subtitle ? (
            <Typography variant="h5" component="h4">
              {subtitle}
            </Typography>
          ) : null}
          {body ? (
            <Typography variant="body2" component="p">
              {body}
            </Typography>
          ) : null}
        </CardContent>
        {ctas?.length ? (
          <CardActions>
            <Link
            // href={href}
            // {...linkProps}
            >
              Link text
            </Link>
          </CardActions>
        ) : null}
      </MuiCard>
    </ErrorBoundary>
  );
};

export default Card;
