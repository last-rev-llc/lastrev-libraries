import React from 'react';
import { Box, Grid } from '@mui/material';
import styled from '@mui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import { LinkProps } from '../Link/Link';
import { useTheme } from '@mui/system';

import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';
export interface NavigationBarProps {
  items?: LinkProps[];
  variant?: string;
  itemsVariant?: string;
  theme: any;
  sidekickLookup: string;
  onRequestClose?: any;
}

export const NavigationBar = ({ items, variant, itemsVariant, onRequestClose, sidekickLookup }: NavigationBarProps) => {
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  const theme = useTheme();
  const menuBreakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} variant={variant} data-testid="NavigationBar" menuBreakpoint={menuBreakpoint}>
        <Grid container sx={{ alignItems: 'center' }}>
          {itemsWithVariant?.map((item) => (
            <Grid item key={item.id} sx={{ md: { justifyContent: 'center', alignItems: 'center' } }}>
              <ContentModule {...item} onRequestClose={onRequestClose} />
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

export default NavigationBar;
