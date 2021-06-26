import React from 'react';
import { Link as MuiLink } from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import { LinkProps } from './Link.types';

export const Link = ({ href, children, ...props }: LinkProps) => {
  return (
    <ErrorBoundary>
      <MuiLink href={href} {...props}>
        {children}
      </MuiLink>
    </ErrorBoundary>
  );
};

export default Link;
