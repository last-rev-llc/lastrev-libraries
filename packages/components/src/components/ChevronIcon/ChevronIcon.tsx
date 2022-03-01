import React from 'react';
import { styled } from '@mui/material/styles';

interface ChevronIconProps {
  open: boolean;
  right?: boolean;
  className?: string;
}

const ChevronIcon = ({ className }: ChevronIconProps) => {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 8L2.5 0.5L0.737501 2.2625L6.4625 8L0.737501 13.7375L2.5 15.5L10 8Z" fill="#FF574A"/>
    </svg>
  );
};

export default styled(ChevronIcon)(({ open, right }: ChevronIconProps) => ({
  transform: open ? (right ? 'rotate(90deg)' : 'rotate(180deg)') : 'rotate(90deg)',
  transition: 'all .2s ease-out'
}));
