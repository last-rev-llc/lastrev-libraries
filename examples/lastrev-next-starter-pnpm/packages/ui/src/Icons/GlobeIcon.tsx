import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function GlobeIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="66" height="66" viewBox="0 0 66 66" fill="none" {...props}>
      <g clipPath="url(#clip0_270_7968)">
        <path
          d="M33 63.6429C49.9236 63.6429 63.6428 49.9236 63.6428 33C63.6428 16.0764 49.9236 2.35715 33 2.35715C16.0764 2.35715 2.35712 16.0764 2.35712 33C2.35712 49.9236 16.0764 63.6429 33 63.6429Z"
          stroke="black"
          strokeWidth="4.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M2.35712 33H63.6428"
          stroke="black"
          strokeWidth="4.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M44.7857 33C44.2068 44.2058 40.0794 54.9372 33 63.6429C25.9207 54.9372 21.7932 44.2058 21.2143 33C21.7932 21.7942 25.9207 11.0628 33 2.35715C40.0794 11.0628 44.2068 21.7942 44.7857 33V33Z"
          stroke="black"
          strokeWidth="4.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <defs>
        <clipPath id="clip0_270_7968">
          <rect width="66" height="66" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default GlobeIcon;
