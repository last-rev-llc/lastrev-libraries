import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function HamburgerIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="49" height="43" viewBox="0 0 49 43" fill="none" {...props}>
      <rect width="49" height="7" fill="black" />
      <rect y="18" width="49" height="7" fill="black" />
      <rect y="36" width="49" height="7" fill="black" />
    </SvgIcon>
  );
}

export default HamburgerIcon;
