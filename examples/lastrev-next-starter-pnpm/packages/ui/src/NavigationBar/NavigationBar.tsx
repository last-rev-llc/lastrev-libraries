import React from 'react';

import { styled } from '@mui/material/styles';

import { useTheme } from '@mui/system';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ContentModule from '../ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';

import type { NavigationBarProps } from './NavigationBar.types';

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
          {itemsWithVariant?.map((item, index) => (
            <Grid item key={`${item.id}-${index}`} sx={{ md: { justifyContent: 'center', alignItems: 'center' } }}>
              <ContentModule
                {...item}
                onClick={onRequestClose}
                color={item?.color ?? 'inherit'}
                {...(item?.__typename == 'NavigationItem' && {
                  onRequestClose
                })}
              />
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
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; menuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  ${({ theme, menuBreakpoint }) => ` // TODO: Move to theme
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

export default NavigationBar;
