import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const HourGlassEmpty: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_2771_29072)">
        <path d="M6 2V8H6.01L6 8.01L10 12L6 16L6.01 16.01H6V22H18V16.01H17.99L18 16L14 12L18 8.01L17.99 8H18V2H6ZM16 16.5V20H8V16.5L12 12.5L16 16.5ZM12 11.5L8 7.5V4H16V7.5L12 11.5Z" />
      </g>
      <defs>
        <clipPath id="clip0_2771_29072">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default HourGlassEmpty;
