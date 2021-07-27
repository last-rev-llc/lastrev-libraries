import React from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import Link from '../Link';
import Media from '../Media';
// import { LinkProps } from '../Link/Link';
import { MediaProps } from '../Media/Media.types';
import Text, { RichText } from '../Text';
// import { RichTextProps } from '../RichText';
import { Breakpoint } from '@material-ui/core';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  body?: RichText;
  actions?: any[];
  image?: MediaProps | MediaProps[];
  background?: any;
  contentWidth?: false | Breakpoint | undefined;
  variant?: any;
  theme: any;
}

export const Hero = ({
  variant,
  background,
  contentWidth,
  title,
  subtitle,
  body,
  actions,
  image,
  theme
}: HeroProps) => {
  console.log('Hero', { variant, background, contentWidth, title, subtitle, body, actions, image, theme });

  return (
    <ErrorBoundary>
      <Root variant={variant}>
        <ContentContainer maxWidth={contentWidth}>
          <Grid container spacing={5} sx={{ maxWidth: 'xl' }}>
            <Grid container spacing={2} item xs={12} sm={6}>
              <Grid item>
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
              </Grid>

              {body ? (
                <Grid item>
                  <Text body={body} />
                </Grid>
              ) : null}
              <Grid item>
                {actions?.map((link) => (
                  <Link {...link} />
                ))}
              </Grid>
            </Grid>
            {image ? (
              <Grid item xs={12} sm={6}>
                {Array.isArray(image) ? <Media {...image[0]} /> : <Media {...image} />}
              </Grid>
            ) : null}
          </Grid>
        </ContentContainer>
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
const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({}));
export default Hero;
