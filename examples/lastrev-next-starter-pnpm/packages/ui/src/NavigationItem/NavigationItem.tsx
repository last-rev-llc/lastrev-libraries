import React from 'react';

import styled from '@mui/system/styled';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { NavigationItemProps, NavigationItemOwnerState } from './NavigationItem.types';
import type { LinkProps } from '../Link';

export const NavigationItem = (props: NavigationItemProps) => {
  const ownerState = {
    ...props,
    numOfCols: props.subNavigation?.length || 1
  };

  const { subNavigation, sidekickLookup, onRequestClose } = props;

  const [open, setOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const menuBreakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';
  const isMobile = useMediaQuery(theme.breakpoints.down(menuBreakpoint), { defaultMatches: true });

  const handleClick = (evt: any) => {
    if (isMobile && subNavigation?.length) {
      evt.preventDefault();
      evt.stopPropagation();
      setOpen(!open);
    } else {
      if (onRequestClose) onRequestClose();
    }
  };

  const handleSubnavClick = () => {
    setOpen(false);
    if (onRequestClose) onRequestClose();
  };

  return (
    <ErrorBoundary>
      <Root sx={{ position: 'relative' }} open={open} data-testid="NavigationItem" menuBreakpoint={menuBreakpoint}>
        <NavigationItemLink
          {...(props as LinkProps)}
          {...sidekick(sidekickLookup)}
          onClick={handleClick}
          __typename="Link"
          ownerState={ownerState}
        />
        {subNavigation?.length ? (
          <NavItemSubMenu menuBreakpoint={menuBreakpoint} component={'ul'} ownerState={ownerState}>
            {subNavigation?.map((item) => (
              <NavItemSubMenuItem key={item.id} ownerState={ownerState}>
                <ContentModule
                  {...item}
                  variant={'link'}
                  onClick={handleSubnavClick}
                  {...(item?.__typename == 'NavigationItem'
                    ? {
                        onRequestClose: handleSubnavClick
                      }
                    : {})}
                  ownerState={ownerState}
                />
              </NavItemSubMenuItem>
            ))}
          </NavItemSubMenu>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

// const visibleStyles = (open: boolean) => `
//   max-height: ${open ? 300 : 0}px;
//   box-shadow: ${open ? 'inset 0 0 16px -8px rgb(0 0 0 / 30%)' : 'inset 0 0 0 0 rgb(0 0 0 / 0%)'};
// `;

// const shouldForwardProp = (prop: string) =>
//   prop !== 'variant' && prop !== 'onRequestClose' && prop !== 'menuBreakpoint';

const Root = styled(Box, {
  name: 'NavigationItem',
  slot: 'Root',
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; open: boolean; menuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  // ${({ open, theme, menuBreakpoint }) => `
  //   @media (max-width: ${theme.breakpoints.values[menuBreakpoint]}px) {
  //     [class$=NavigationItem-menuRoot] {
  //       ${visibleStyles(open)}
  //     }
  //   }
  //   @media (min-width: ${theme.breakpoints.values[menuBreakpoint]}px) {
  //     [class$=NavigationItem-menuRoot] {
  //       max-height: 0px;
  //     }
  //     &:hover {
  //       background: rgba(0,0,0,0.05);
  //       [class$=NavigationItem-menuRoot] {
  //         max-height: 300px;
  //       }
  //     }
  //  }
  // `}
`;

const NavItemSubMenu = styled(List, {
  name: 'NavigationItem',
  slot: 'NavItemSubMenu',
  // shouldForwardProp: (prop: string) => prop !== 'numOfCols',
  overridesResolver: (_, styles) => [styles.navItemSubMenu]
})<{ ownerState: NavigationItemOwnerState }>``;

const NavItemSubMenuItem = styled(ListItem, {
  name: 'NavigationItem',
  slot: 'NavItemSubMenuItem',
  overridesResolver: (_, styles) => [styles.navItemSubMenuItem]
})<{ ownerState: NavigationItemOwnerState }>``;

const NavigationItemLink = styled(ContentModule, {
  name: 'NavigationItem',
  slot: 'Link',
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.link]
})<{ ownerState: NavigationItemOwnerState }>``;

const MenuRoot = styled(Paper, {
  name: 'NavigationItem',
  slot: 'MenuRoot',
  // shouldForwardProp,
  overridesResolver: (_, styles) => [styles.menuRoot]
})<{ ownerState: NavigationItemOwnerState }>``;

export default NavigationItem;
