import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import Link, { LinkProps } from '../Link';
import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';
// type NavigationItem = LinkProps | NavigationItemProps;

// export type NavigationItemProps = {
//   subNavigation: [NavigationItem];
// } & LinkProps;
export interface NavigationItemProps extends LinkProps {
  subNavigation: [LinkProps];
  sidekickLookup?: any;
}

export const NavigationItem = ({ subNavigation, sidekickLookup, ...props }: NavigationItemProps) => {
  const linkRef = React.useRef(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);

  return (
    <ErrorBoundary>
      <>
        <Link
          {...props}
          onClick={() => setOpen(true)}
          onMouseOver={() => setOpen(true)}
          aria-owns={linkRef?.current ? props.id : undefined}
          aria-haspopup="true"
          ref={linkRef}
        />
        {subNavigation?.length ? (
          <Menu
            id={props.id}
            anchorEl={linkRef?.current}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            disableScrollLock
            MenuListProps={{ onMouseLeave: handleClose, ...sidekick(sidekickLookup.subNavigation) }}>
            {
              subNavigation?.map((item) => (
                <MenuItem key={item.id}>
                  <ContentModule {...item} />
                </MenuItem>
              ))
              // <MenuItem key={item.id} onClick={handleClose}>
              // </MenuItem>
            }
          </Menu>
        ) : null}
      </>
    </ErrorBoundary>
  );
};

export default NavigationItem;
