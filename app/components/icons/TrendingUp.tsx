import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const TrendingUp: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_2855_11029)">
        <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" />
      </g>
      <defs>
        <clipPath id="clip0_2855_11029">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default TrendingUp;
