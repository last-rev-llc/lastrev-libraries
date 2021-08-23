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
import sidekick from '../../utils/sidekick';
export interface HeroProps {
  id: string;
  __typename: string;
  title?: string;
  subtitle?: string;
  body?: RichText;
  actions?: any[];
  image?: MediaProps | MediaProps[];
  background?: any;
  contentWidth?: false | Breakpoint | undefined;
  variant?: any;
  theme: any;
  sidekickLookup?: any;
}

export const Hero = ({
  variant,
  // background,
  contentWidth,
  title,
  subtitle,
  body,
  actions,
  image,
  sidekickLookup
}: // theme
HeroProps) => {
  // console.log('Hero', { variant, background, contentWidth, title, subtitle, body, actions, image, theme });

  return (
    <ErrorBoundary>
      <Root variant={variant} {...sidekick(sidekickLookup)}>
        <ContentContainer maxWidth={contentWidth}>
          <Grid
            container
            spacing={5}
            sx={{
              maxWidth: image ? 'xl' : 'lg',
              margin: !image ? '0 auto' : undefined
            }}>
            {title || subtitle || body || actions ? (
              <Grid
                container
                direction="column"
                spacing={2}
                item
                xs={12}
                sm={image ? 6 : 12}
                sx={{ textAlign: !image ? 'center' : undefined }}>
                <Grid item>
                  {title ? (
                    <Typography
                      variant="h1"
                      component="h1"
                      sx={{ color: !subtitle ? '#005C7A' : undefined }}
                      {...sidekick(sidekickLookup?.title)}>
                      {title}
                    </Typography>
                  ) : null}
                  {subtitle ? (
                    <Typography
                      variant={!title ? 'h1' : 'h2'}
                      component={!title ? 'h1' : 'h2'}
                      sx={{ color: !title ? '#005C7A' : undefined }}
                      {...sidekick(sidekickLookup?.subtitle)}>
                      {subtitle}
                    </Typography>
                  ) : null}
                </Grid>
                {body ? (
                  <Grid item {...sidekick(sidekickLookup?.body)}>
                    <Text body={body} />
                  </Grid>
                ) : null}
                {actions ? (
                  <Grid item pt={3} {...sidekick(sidekickLookup?.actions)}>
                    {actions?.map((link) => (
                      <Link key={link.id} {...link} />
                    ))}
                  </Grid>
                ) : null}
              </Grid>
            ) : null}
            {image ? (
              <Grid item xs={12} sm={6}>
                <Media {...(Array.isArray(image) ? image[0] : image)} {...sidekick(sidekickLookup?.image)} />
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
  shouldForwardProp: (prop) => prop !== 'variant',
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
    ...styles.contentContainer,
    padding: 40
  })
})<{ variant?: string }>(() => ({}));
export default Hero;
