import React from 'react';
import dynamic from 'next/dynamic';
import { default as MuiIcon } from '@mui/material/Icon';

const LogoIcon = dynamic(() => import('./LogoIcon'));
const SearchIcon = dynamic(() => import('./SearchIcon'));

export const Icon = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'logo':
      return <LogoIcon />;
      break;

    case 'search':
      return <SearchIcon />;
      break;

    default:
      const brandIcons = ['google', 'twitter', 'facebook', 'github', 'linkedin', 'pinterest', 'instagram', 'youtube'];
      const iconString = iconName.toString().toLowerCase();
      return <MuiIcon className={`fa${brandIcons.includes(iconString) ? 'b' : 's'} fa-${iconString}`} />;
  }
};
