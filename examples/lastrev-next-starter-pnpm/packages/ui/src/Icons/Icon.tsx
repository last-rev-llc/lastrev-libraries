import React from 'react';
import dynamic from 'next/dynamic';
import { default as MuiIcon } from '@mui/material/Icon';

const LogoIcon = dynamic(() => import('./LogoIcon'));

export const Icon = ({ iconName }: { iconName: string }) => {
  console.log({ iconName });
  switch (iconName) {
    case 'logo':
      return <LogoIcon />;
      break;

    default:
      const brandIcons = ['google', 'twitter', 'facebook', 'github', 'linkedin', 'pinterest', 'instagram', 'youtube'];
      const iconString = iconName.toString().toLowerCase();
      return <MuiIcon className={`fa${brandIcons.includes(iconString) ? 'b' : 's'} fa-${iconString}`} />;
  }
};
