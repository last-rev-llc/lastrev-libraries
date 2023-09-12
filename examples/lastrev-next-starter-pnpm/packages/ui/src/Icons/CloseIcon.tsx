import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="22" height="21" viewBox="0 0 22 21" fill="none" {...props}>
      <rect
        width="25.8713"
        height="3.55355"
        transform="matrix(0.703496 0.710699 -0.703496 0.710699 3 0.0876465)"
        fill="inherit"
      />
      <rect
        width="25.8713"
        height="3.55355"
        transform="matrix(-0.703496 0.710699 -0.703496 -0.710699 21.5 2.52539)"
        fill="inherit"
      />
    </SvgIcon>
  );
}

export default CloseIcon;
