import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardActions,
  CardContent,
  // CardMedia,
  Link,
  Box,
  Typography
} from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import { ImageProps } from '../Image/Image.types';
import { LinkProps } from '../Link/Link.types';
// import { useTheme } from '@material-ui/core/styles';
import styled from '@material-ui/system/styled';

export interface CardProps extends MuiCardProps {
  variant?: any;
  title?: string;
  subtitle?: string;
  image?: ImageProps;
  body?: string;
  ctas?: LinkProps[];
}

export interface CardOverrides {}

export const Card = ({
  image, title, subtitle, body, ctas, variant }: CardProps) => {
  return (
    <ErrorBoundary>
      <CardRoot variant={variant}>
        {image ? (
          // <CardMedia
          //   component={Image}
          //   {...image}
          // />
          <Box>
            <Image {...image} />
          </Box>
        ) : null}
        {title || subtitle || body ? (
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
        ) : null}
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
      </CardRoot>
    </ErrorBoundary>
  );
};

const CardRoot = styled(MuiCard, {
  name: 'Card',
  slot: 'Root',
  overridesResolver: (props, styles) => ({
    ...styles.root,
  })
})<MuiCardProps & {}>(() => ({}));

export default Card;
