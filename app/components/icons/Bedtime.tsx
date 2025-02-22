import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Bedtime: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M9.27 4.48999C7.64 12.03 13.02 16.9 16.93 18.29C15.54 19.38 13.81 20 12 20C7.59 20 4 16.41 4 12C4 8.54999 6.2 5.59999 9.27 4.48999ZM11.99 2.00999C6.4 2.00999 2 6.53999 2 12C2 17.52 6.48 22 12 22C15.71 22 18.93 19.98 20.66 16.98C13.15 16.73 8.57 8.54999 12.34 2.00999C12.22 2.00999 12.11 2.00999 11.99 2.00999Z" />
    </SvgIcon>
  );
};

export default Bedtime;
