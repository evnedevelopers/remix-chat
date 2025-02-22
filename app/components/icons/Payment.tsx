import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Payment: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_2771_27682)">
        <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" />
      </g>
      <defs>
        <clipPath id="clip0_2771_27682">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default Payment;
