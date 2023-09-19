import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

function EmailIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
      <path
        d="M1 7H39V33H1V7Z"
        stroke="#0580E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M38 8L20 22L2 8"
        stroke="#0580E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
}

export default EmailIcon;
