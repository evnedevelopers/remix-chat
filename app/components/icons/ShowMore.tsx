import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ShowMore: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_3744_123300)">
        <path d="M5.83 12L9 8.83L7.59 7.42L3 12L7.59 16.59L9 15.17L5.83 12ZM18.17 12L15 15.17L16.41 16.58L21 12L16.41 7.41L15 8.83L18.17 12Z" />
      </g>
      <defs>
        <clipPath id="clip0_3744_123300">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default ShowMore;
