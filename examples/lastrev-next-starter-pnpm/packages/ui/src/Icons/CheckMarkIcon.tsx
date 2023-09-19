import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

function CheckMarkIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="66" height="50" viewBox="0 0 66 50" fill="none" {...props}>
      <path
        d="M65.7882 7.38059L58.3996 0L23.1601 35.2381L7.38858 19.4666L0 26.8472L23.1602 50L65.7882 7.38059Z"
        fill="black"
      />
    </SvgIcon>
  );
}

export default CheckMarkIcon;
