import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ShowLess: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_3744_123345)">
        <path d="M6.17 12L3 8.83L4.41 7.42L9 12L4.41 16.59L3 15.17L6.17 12ZM17.83 12L21 15.17L19.59 16.58L15 12L19.59 7.41L21 8.83L17.83 12Z" />
      </g>
      <defs>
        <clipPath id="clip0_3744_123345">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default ShowLess;
