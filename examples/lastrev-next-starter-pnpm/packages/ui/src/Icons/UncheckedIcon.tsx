import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function UncheckedIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#BEBEBE" fill="none" />
    </SvgIcon>
  );
}

export default UncheckedIcon;
