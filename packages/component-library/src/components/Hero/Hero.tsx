import React from 'react';
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import Link from '../Link';
import Media from '../Media';
import { LinkProps } from '../Link/Link.types';
import { MediaProps } from '../Media/Media.types';
import RichText, { RichTextProps } from '../RichText';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  body?: RichTextProps;
  actions?: LinkProps[];
  image?: MediaProps;
  background?: any;
  variant?: any;
  theme: any;
}

export const Hero = ({ variant, background, title, subtitle, body, actions, image, theme }: HeroProps) => {
  console.log('Hero', variant, background, title, subtitle, body, actions, image, theme);

  return (
    <ErrorBoundary>
      <Root variant={variant}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            {title ? (
              <Typography variant="h1" component="h1">
                {title}
              </Typography>
            ) : null}
            {subtitle ? (
              <Typography variant="h2" component="h2">
                {subtitle}
              </Typography>
            ) : null}
            {/* {body ? (
              <RichText {...body} />
            ) : null} */}
            {actions?.map((link, idx) => {
              return (
                <Link
                  href={link.href}
                >
                  {link.children}
                </Link>
              );
            })}
          </Grid>
          {image ? (
            <Grid item xs={12} sm={6}>
              <Media {...image} />
            </Grid>
          ) : null}
        </Grid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Hero',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

// const GridContainer = styled(Grid, {
//   name: 'Hero',
//   slot: 'GridContainer',
//   overridesResolver: (_, styles) => ({
//     ...styles.gridContainer
//   })
// })(() => ({}));

// const GridItem = styled(Grid, {
//   name: 'Hero',
//   slot: 'GridItem',
//   overridesResolver: (_, styles) => ({
//     ...styles.gridItem
//   })
// })(() => ({}));

export default Hero;
