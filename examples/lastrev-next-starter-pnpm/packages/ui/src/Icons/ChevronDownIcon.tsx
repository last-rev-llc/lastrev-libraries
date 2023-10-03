import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function ChevronDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="17" height="10" viewBox="0 0 17 10" fill="none" {...props}>
      <path
        d="M1.9975 0.737305L8.5 6.4623L15.0025 0.737305L17 2.4998L8.5 9.9998L0 2.4998L1.9975 0.737305Z"
        fill="#A4A4A4"
      />
    </SvgIcon>
  );
}

export default ChevronDownIcon;
