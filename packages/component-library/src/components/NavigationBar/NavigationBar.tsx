import React from 'react';
import { Box, Grid } from '@material-ui/core';
// import { Breakpoint } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import { LinkProps } from '../Link/Link';
// import { MediaProps } from '../Media';
// import { CardProps } from '../Card';
import ContentModule from '../ContentModule';
// import sidekickInit from "../../utils/sidekickUtility";

export interface NavigationBarProps {
  items?: LinkProps[];
  variant?: string;
  theme: any;
}

export const NavigationBar = ({ items, variant }: NavigationBarProps) => {
  console.log('NavigationBar', { items, variant });
  if (!items?.length) return null;
  // const { sidekicker } = sidekickInit(props);
  // const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      <Root
        variant={variant}
        // {...sidekicker('NavigationBar')}
      >
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          {items?.map((item) => (
            <Grid item key={item.id}>
              <ContentModule {...item} />
            </Grid>
          ))}
        </Grid>
        {/* {!contentWidth ? (
          <Section contents={itemsWithVariant} background={background} variant={`NavigationBar-${variant}`} />
        ) : (
          <ContentContainer maxWidth={contentWidth}>
            <Section
              contents={itemsWithVariant}
              background={background}
              variant={`NavigationBar-${variant}`}
              styles={{ root: { py: 2 } }}
            />
          </ContentContainer>
        )} */}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'NavigationBar',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    height: '100%',
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

// const ContentContainer = styled(Container, {
//   name: 'NavigationBar',
//   slot: 'ContentContainer',
//   overridesResolver: (_, styles) => ({
//     ...styles.contentContainer
//   })
// })<{ variant?: string }>(() => ({}));

export default NavigationBar;
