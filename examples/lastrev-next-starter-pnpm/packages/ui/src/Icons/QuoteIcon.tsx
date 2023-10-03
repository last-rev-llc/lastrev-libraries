import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function QuoteIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="75" height="56" viewBox="0 0 75 56" fill="none" {...props}>
      <g clipPath="url(#clip0_158_4123)">
        <path d="M0 0V56L28.1239 27.9979V0H0ZM46.8761 0V56L75 28.0021V0H46.8761Z" fill="inherit" />
      </g>
      <defs>
        <clipPath id="clip0_158_4123">
          <rect width="75" height="56" fill="inherit" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default QuoteIcon;
