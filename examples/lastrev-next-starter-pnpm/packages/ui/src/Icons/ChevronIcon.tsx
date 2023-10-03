import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function ChevronIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="38" height="58" viewBox="0 0 38 58" fill="none" {...props}>
      <g clipPath="url(#clip0_58_2509)">
        <path
          d="M2.80249 51.185L24.5575 29L2.80249 6.815L9.49999 -2.92757e-07L38 29L9.49999 58L2.80249 51.185Z"
          fill="inherit"
        />
      </g>
      <defs>
        <clipPath id="clip0_58_2509">
          <rect width="58" height="38" fill="white" transform="translate(0 58) rotate(-90)" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default ChevronIcon;
