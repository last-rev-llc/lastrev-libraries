import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

function Ellipse3Icon(props: SvgIconProps) {
  return (
    <SvgIcon width="1466" height="1466" viewBox="0 0 1466 1466" fill="none" {...props}>
      <circle cx="733" cy="733" r="731.5" stroke="url(#paint0_radial_876_16952)" strokeWidth="3" fill="none" />
      <defs>
        <radialGradient
          id="paint0_radial_876_16952"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1466 733) rotate(160.414) scale(1346.87)">
          <stop stopColor="#C0FF60" />
          <stop offset="1" stopColor="#C0FF60" stopOpacity="0" />
        </radialGradient>
      </defs>
    </SvgIcon>
  );
}

export default Ellipse3Icon;
