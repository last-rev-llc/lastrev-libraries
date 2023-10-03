import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

function Ellipse2Icon({ setRef, ...props }: SvgIconProps & { setRef: React.LegacyRef<SVGCircleElement> | undefined }) {
  return (
    <SvgIcon width="1090" height="1090" viewBox="0 0 1090 1090" fill="none" {...props}>
      <circle
        cx="545"
        cy="545"
        r="544"
        stroke="url(#paint0_radial_876_16951)"
        strokeWidth="2"
        fill="none"
        ref={setRef}
      />
      <defs>
        <radialGradient
          id="paint0_radial_876_16951"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1090 545) rotate(155.008) scale(977.53)">
          <stop stopColor="#C0FF60" />
          <stop offset="1" stopColor="#C0FF60" stopOpacity="0" />
        </radialGradient>
      </defs>
    </SvgIcon>
  );
}

export default Ellipse2Icon;
