import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function FacebookIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="75" height="75" viewBox="0 0 75 75" fill="none" {...props}>
      <rect width="75" height="75" rx="37.5" className="fill-primary" />
      <path
        d="M52.0972 48.3398L53.7598 37.5H43.3594V30.4688C43.3594 27.5024 44.8096 24.6094 49.4678 24.6094H54.1992V15.3809C54.1992 15.3809 49.9072 14.6484 45.8057 14.6484C37.2363 14.6484 31.6406 19.8413 31.6406 29.2383V37.5H22.1191V48.3398H31.6406V74.5459C33.5522 74.8462 35.5078 75 37.5 75C39.4922 75 41.4478 74.8462 43.3594 74.5459V48.3398H52.0972Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default FacebookIcon;
