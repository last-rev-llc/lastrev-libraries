import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function CheckedIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" fill="#0580E8" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#BEBEBE" fill="none" />
      <path
        d="M16.9551 6.47612L15.3878 5L7.91274 12.0476L4.56727 8.89332L3 10.3694L7.91277 15L16.9551 6.47612Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default CheckedIcon;
