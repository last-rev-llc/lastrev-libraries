import React from 'react';
import { Box as MuiBox, Grid as MuiGrid } from '@mui/material';
import styled from '@mui/system/styled';
import { useTheme } from '@mui/system';

import ErrorBoundary from '../ErrorBoundary';
import CModule from '../ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';
import { NavigationBarProps } from './NavigationBar.types';

export const NavigationBar = ({
  items,
  variant,
  itemsVariant,
  onRequestClose,
  sidekickLookup,
  color
}: NavigationBarProps) => {
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  const theme = useTheme();
  const menuBreakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        variant={variant}
        data-testid="NavigationBar"
        menuBreakpoint={menuBreakpoint}
        sx={color ? { backgroundColor: `${color}.main`, color: `${color}.contrastText` } : null}>
        <Grid container sx={{ alignItems: 'center' }}>
          {itemsWithVariant?.map((item) => (
            <NavigationBarItemRoot item key={item.id} sx={{ md: { justifyContent: 'center', alignItems: 'center' } }}>
              <ContentModule
                {...item}
                onClick={onRequestClose}
                color={item?.color ?? 'inherit'}
                {...(item?.__typename == 'NavigationItem' && {
                  onRequestClose
                })}
              />
            </NavigationBarItemRoot>
          ))}
        </Grid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(MuiBox, {
  name: 'NavigationBar',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; menuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  ${({ theme, menuBreakpoint }) => `
    @media (min-width: ${theme.breakpoints.values[menuBreakpoint]}px) {
      height: 100%;
      > .MuiGrid-container {
        height: 100%;
        border-top: 1px solid ${theme.palette.divider};
        > .MuiGrid-item {
          height: 100%;
          display:flex;
          justify-content: center;
          align-items: center;
        }
      }
      .MuiLink-root {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding:  ${theme.spacing(3)};
      }
      .MuiButton-root {
        margin-left: ${theme.spacing(3)};
      }
      [class$='NavigationItem-root'] {
        height: 100%;

      }
    }
  `}
`;

const Grid = styled(MuiGrid, {
  name: 'NavigationBar',
  slot: 'Grid',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.grid]
})``;

const NavigationBarItemRoot = styled(MuiGrid, {
  name: 'NavigationBar',
  slot: 'ItemRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.itemRoot]
})``;

const ContentModule = styled(CModule, {
  name: 'ContentModule',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.contentModule]
})``;

export default NavigationBar;
