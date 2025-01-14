import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Done: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_894_33289)">
        <path d="M8.9999 16.2L4.7999 12L3.3999 13.4L8.9999 19L20.9999 7.00001L19.5999 5.60001L8.9999 16.2Z" />
      </g>
      <defs>
        <clipPath id="clip0_894_33289">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default Done;
