import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function Ellipse1Icon(props: SvgIconProps) {
  return (
    <SvgIcon width="790" height="790" viewBox="0 0 790 790" fill="none" {...props}>
      <circle cx="395" cy="395" r="394.5" stroke="url(#paint0_radial_876_16950)" fill="none" />
      <defs>
        <radialGradient
          id="paint0_radial_876_16950"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(790 395) rotate(173.182) scale(786.132)">
          <stop stopColor="#C0FF60" />
          <stop offset="1" stopColor="#C0FF60" stopOpacity="0" />
        </radialGradient>
      </defs>
    </SvgIcon>
  );
}

export default Ellipse1Icon;
