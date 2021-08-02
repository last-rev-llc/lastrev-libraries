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

export interface CardProps extends MuiCardProps {
  __typename: string;
  variant?: any;
  title?: string;
  subtitle?: string;
  media?: MediaProps | MediaProps[];
  body?: string;
  cardBody?: string;
  actions?: LinkProps[];
  textAlign?: string;
  colorTitle?: string;
  colorSubtitle?: string;
  colorBody?: string;
}

export interface CardOverrides {}

export const Card = ({
  media,
  title,
  subtitle,
  body,
  actions,
  variant,
  textAlign,
  cardBody,
  colorTitle,
  colorSubtitle,
  colorBody
}: CardProps) => {
  return (
    <ErrorBoundary>
      <CardRoot variant={variant}>
        {media ? (
          // <CardMedia
          //   component={Image}
          //   {...image}
          // />
          <Box display="flex" justifyContent="center">
            <Media {...(Array.isArray(media) ? media[0] : media)} />
          </Box>
        ) : null}
        {title || subtitle || body || actions ? (
          <CardContent>
            <Box textAlign={textAlign}>
              {title ? (
                <Typography variant="h3" color={colorTitle} component="h3">
                  {title}
                </Typography>
              ) : null}
              {subtitle ? (
                <Typography variant="h4" color={colorSubtitle} component="h4">
                  {subtitle}
                </Typography>
              ) : null}
              {body ?? cardBody ? (
                <Typography variant="body2" color={colorBody} component="p">
                  {body ?? cardBody}
                </Typography>
              ) : null}
              {actions?.length ? (
                <CardActions>
                  <Box justify={textAlign}>
                    {actions?.map((link) => (
                      <Link {...link} />
                    ))}
                  </Box>
                </CardActions>
              ) : null}
            </Box>
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
