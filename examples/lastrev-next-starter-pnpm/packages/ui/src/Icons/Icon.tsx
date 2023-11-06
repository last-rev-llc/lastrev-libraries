import React from 'react';
import dynamic from 'next/dynamic';
import { default as MuiIcon } from '@mui/material/Icon';
const ICONS: any = {
  logo: dynamic(() => import('./LogoIcon')),
  instagram: dynamic(() => import('./InstagramIcon')),
  linkedin: dynamic(() => import('./LinkedinIcon')),
  facebook: dynamic(() => import('./FacebookIcon')),
  twitter: dynamic(() => import('./TwitterIcon'))
};
export const Icon = ({ iconName }: { iconName: string }) => {
  if (ICONS[iconName]) {
    const Icon = ICONS[iconName];
    return <Icon />;
  }

  const brandIcons = ['google', 'twitter', 'facebook', 'github', 'linkedin', 'pinterest', 'instagram', 'youtube'];
  const iconString = iconName.toString().toLowerCase();
  return <MuiIcon className={`fa${brandIcons.includes(iconString) ? 'b' : 's'} fa-${iconString}`} />;
};
