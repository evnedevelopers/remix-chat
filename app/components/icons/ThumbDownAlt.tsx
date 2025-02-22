import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ThumbDownAlt: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M22 4H20C19.45 4 19 4.45 19 5V14C19 14.55 19.45 15 20 15H22V4ZM2.17 11.12C2.06 11.37 2 11.64 2 11.92V13C2 14.1 2.9 15 4 15H9.5L8.58 19.65C8.53 19.87 8.56 20.11 8.66 20.31C8.89 20.76 9.18 21.17 9.54 21.53L10 22L16.41 15.59C16.79 15.21 17 14.7 17 14.17V6.34C17 5.05 15.95 4 14.66 4H6.56C5.85 4 5.2 4.37 4.84 4.97L2.17 11.12Z" />
    </SvgIcon>
  );
};

export default ThumbDownAlt;
