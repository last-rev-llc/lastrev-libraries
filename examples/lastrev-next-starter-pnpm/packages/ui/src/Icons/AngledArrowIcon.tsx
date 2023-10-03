import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function AngledArrowIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="53" height="55" viewBox="0 0 53 55" fill="none" {...props}>
      <g clip-path="url(#clip0_2209_14883)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.2228 41.2902V19.003L7.62023 55L0 47.0727L34.2669 11.4248H12.839V0.213234L53 1.36937e-06V41.2902H42.2228Z"
          fill="#C0FF60"
        />
      </g>
      <defs>
        <clipPath id="clip0_2209_14883">
          <rect width="55" height="53" fill="white" transform="translate(0 55) rotate(-90)" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default AngledArrowIcon;
