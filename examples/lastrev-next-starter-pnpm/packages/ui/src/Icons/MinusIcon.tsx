import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

function MinusIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <g clip-path="url(#clip0_139_1839)">
        <rect x="24" y="9.14258" width="5.14286" height="24" transform="rotate(90 24 9.14258)" fill="black" />
      </g>
      <defs>
        <clipPath id="clip0_139_1839">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default MinusIcon;
