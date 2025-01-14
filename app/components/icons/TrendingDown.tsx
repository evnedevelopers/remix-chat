import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const TrendingDown: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_2855_11030)">
        <path d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z" />
      </g>
      <defs>
        <clipPath id="clip0_2855_11030">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default TrendingDown;
