import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const DoneAll: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_894_33290)">
        <path d="M17.9999 7L16.5899 5.59L10.2499 11.93L11.6599 13.34L17.9999 7ZM22.2399 5.59L11.6599 16.17L7.47991 12L6.06991 13.41L11.6599 19L23.6599 7L22.2399 5.59ZM0.409912 13.41L5.99991 19L7.40991 17.59L1.82991 12L0.409912 13.41Z" />
      </g>
      <defs>
        <clipPath id="clip0_894_33290">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default DoneAll;
