import React from 'react';
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps
} from '@material-ui/core';


interface LinkProps extends MuiLinkProps {
  // test: string;
}

export const Link = ({
  // test,
  children,
  ...restProps
}: LinkProps) => {
  return (
    <MuiLink
      {...restProps}
    >
      {children}
      Link
    </MuiLink>
  );
};

export default Link;
