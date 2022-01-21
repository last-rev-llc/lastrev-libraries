import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import ErrorBoundary from '../ErrorBoundary';
import Link, { LinkProps } from '../Link';
import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';

// type NavigationItem = LinkProps | NavigationItemProps;

// export type NavigationItemProps = {
//   subNavigation: [NavigationItem];
// } & LinkProps;
export interface NavigationItemProps extends LinkProps {
  subNavigation?: Array<LinkProps>;
  sidekickLookup?: any;
  onRequestClose?: any;
}

export const NavigationItem = ({ subNavigation, sidekickLookup, onRequestClose, ...props }: NavigationItemProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const menuBreakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';
  const isMobile = useMediaQuery(theme.breakpoints.down(menuBreakpoint));
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

  // console.log({ handleSubnavClick, onRequestClose });

  return (
    <ErrorBoundary>
      <Root sx={{ position: 'relative' }} open={open} data-testid="NavigationItem" menuBreakpoint={menuBreakpoint}>
        <Link {...props} {...sidekick(sidekickLookup)} onClick={handleClick} />
        {subNavigation?.length ? (
          <MenuRoot menuBreakpoint={menuBreakpoint}>
            {subNavigation?.map((item) => (
              <MenuItem key={item.id}>
                <ContentModule
                  {...item}
                  variant={'link'}
                  onClick={handleSubnavClick}
                  onRequestClose={handleSubnavClick}
                />
              </MenuItem>
            ))}
          </MenuRoot>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const visibleStyles = (open: boolean) => `
  max-height: ${open ? 300 : 0}px;
  box-shadow: ${open ? 'inset 0 0 16px -8px rgb(0 0 0 / 30%)' : 'inset 0 0 0 0 rgb(0 0 0 / 0%)'};
`;

const Root = styled(Box, {
  name: 'NavigationItem',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; open: boolean; menuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  ${({ open, theme, menuBreakpoint }) => `
    @media (max-width: ${theme.breakpoints.values[menuBreakpoint]}px) {
      [class$=NavigationItem-menuRoot] {
        ${visibleStyles(open)}
      }
    }
    @media (min-width: ${theme.breakpoints.values[menuBreakpoint]}px) {
      [class$=NavigationItem-menuRoot] {
        max-height: 0px;
      }
      &:hover {
        background: rgba(0,0,0,0.05);
        [class$=NavigationItem-menuRoot] {
          max-height: 300px;
        }
      }
   }
  `}
`;

const MenuRoot = styled(Paper, {
  name: 'NavigationItem',
  slot: 'MenuRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.menuRoot]
})<{ variant?: string; menuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  ${({ theme, menuBreakpoint }) => `
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.3s ease-in-out;
    background: rgb(242 242 242);

    // Desktop
    @media (min-width: ${theme.breakpoints.values[menuBreakpoint]}px) {
      box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 10px -10px 0px rgb(0 0 0 / 12%);
      position: absolute;
      right: 0;
      .MuiMenuItem-root {
        padding: 0;
        display:block;
        width: 100%;
        * {
          width: 100%;
        }
      }
    }

    // Mobile
    @media (max-width: ${theme.breakpoints.values[menuBreakpoint]}px) {
      width: 100%;
      && { // Needed to override Paper styles
       box-shadow: inset 0 0 16px -8px rgb(0 0 0 / 30%)
      }
      .MuiMenuItem-root{
        width: 100%;
        display: block;
        padding: 0;
        > div {
          width: 100%;
        }
      }
    }
  `}
`;

export default NavigationItem;
