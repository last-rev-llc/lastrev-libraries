import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import Link, { LinkProps } from '../Link';
import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';
// type NavigationItem = LinkProps | NavigationItemProps;

// export type NavigationItemProps = {
//   subNavigation: [NavigationItem];
// } & LinkProps;
export interface NavigationItemProps extends LinkProps {
  subNavigation?: [LinkProps];
  sidekickLookup?: any;
  onRequestClose?: any;
}

export const NavigationItem = ({ subNavigation, sidekickLookup, onRequestClose, ...props }: NavigationItemProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  // const handleClose = () => setOpen(false);
  const handleClick = (evt: any) => {
    if (subNavigation?.length) {
      evt.preventDefault();
      evt.stopPropagation();
      setOpen(!open);
    }
  };
  const handleSubnavClick = () => {
    // console.log('handleSubnavClick', { onRequestClose });
    setOpen(false);
    if (onRequestClose) onRequestClose();
  };

  // console.log({ handleSubnavClick, onRequestClose });

  return (
    <ErrorBoundary>
      <Root sx={{ position: 'relative' }} open={open}>
        <Link {...props} {...sidekick(sidekickLookup)} onClick={handleClick} />
        {subNavigation?.length ? (
          <MenuRoot>
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
  overridesResolver: (_, styles) => ({
    ...styles.MenuRoot
  })
})<{ variant?: string; open: boolean }>`
  ${({ open, theme }) => `
    [class$=NavigationItem-menuRoot] {
      ${visibleStyles(open)}   
    }
    @media (min-width: ${theme.breakpoints.values.sm}px) {  
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
  overridesResolver: (_, styles) => ({
    ...styles.MenuRoot
  })
})<{ variant?: string }>`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.3s ease-in-out;

    // Desktop
    @media (min-width: ${theme.breakpoints.values.sm}px) {  
      position: absolute;
      top: 100%;
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
    @media (max-width: ${theme.breakpoints.values.sm}px) {  
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
