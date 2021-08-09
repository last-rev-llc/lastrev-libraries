import React from 'react';
import { Box, Grid } from '@material-ui/core';
// import { Breakpoint } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import { LinkProps } from '../Link/Link';

import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';
export interface NavigationBarProps {
  items?: LinkProps[];
  variant?: string;
  itemsVariant?: string;
  theme: any;
  sidekickLookup: string;
}

export const NavigationBar = ({ items, variant, itemsVariant, sidekickLookup }: NavigationBarProps) => {
  console.log('NavigationBar', { items, variant });
  if (!items?.length) return null;
  // const { sidekicker } = sidekickInit(props);
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        variant={variant}
        // {...sidekicker('NavigationBar')}
      >
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          {itemsWithVariant?.map((item) => (
            <Grid item key={item.id}>
              <ContentModule {...item} />
            </Grid>
          ))}
        </Grid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'NavigationBar',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
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
