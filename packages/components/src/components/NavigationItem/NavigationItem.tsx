import React from 'react';
import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, alpha } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import { LinkProps } from '@last-rev/component-library/dist/components/Link';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { sidekick } from '../../utils/sidekick';
import Link from '../Link';

export interface NavigationItemProps extends LinkProps {
  subNavigation?: Array<LinkProps>;
  sidekickLookup?: any;
  onRequestClose?: any;
  hideIcon?: Boolean;
}

export const NavigationItem = ({
  subNavigation,
  sidekickLookup,
  onRequestClose,
  hideIcon,
  ...props
}: NavigationItemProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const menuBreakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'md';
  const isMobile = useMediaQuery(theme.breakpoints.down(menuBreakpoint));

  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
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
        {subNavigation?.length ? (
          <>
            <Box display="flex" alignItems="center" onClick={handleClick}>
              <Link {...props} {...sidekick(sidekickLookup)} />
              {!hideIcon && <ExpandMoreIcon sx={{ fill: 'white', width: 24, ml: -0.25 }} />}
            </Box>
            <MenuRoot
              menuBreakpoint={menuBreakpoint}
              sx={{
                display: open ? 'flex' : 'none'
              }}>
              {subNavigation?.map((item) => (
                <MenuItem key={item.id}>
                  <ContentModule
                    {...item}
                    variant="link"
                    onClick={handleSubnavClick}
                    onRequestClose={handleSubnavClick}
                  />
                </MenuItem>
              ))}
            </MenuRoot>
          </>
        ) : (
          <Link {...props} {...sidekick(sidekickLookup)} onClick={handleClick} />
        )}
      </Root>
    </ErrorBoundary>
  );
};

const visibleStyles = (open: boolean) => `
  @media (min-width: 1024px) {
    box-shadow: ${open ? 'inset 0 0 16px -8px rgb(0 0 0 / 30%)' : 'inset 0 0 0 0 rgb(0 0 0 / 0%)'};
  }
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
    @media (min-width: 1024px) {
      &:hover {
        background-color: ${alpha(theme.palette.common.black, 0.05)},

        [class$=NavigationItem-menuRoot] {
          max-height: 400px;
        }
      }
    }
  `}
`;

const MenuRoot = styled(MenuList, {
  name: 'NavigationItem',
  slot: 'MenuRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.menuRoot]
})<{ variant?: string; menuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  ${({ theme, menuBreakpoint }) => `
    flex-direction: column;
    overflow: hidden;
    transition: 0.3s ease-in-out;
    background: rgb(242 242 242);

    // Desktop
    @media (min-width: 1024px) {
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
        box-shadow: none;
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
