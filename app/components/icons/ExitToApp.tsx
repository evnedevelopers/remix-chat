import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ExitToApp: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_3146_21730)">
        <path d="M10.09 15.59L11.5 17L16.5 12L11.5 7L10.09 8.41L12.67 11H3V13H12.67L10.09 15.59ZM19 3H5C3.89 3 3 3.9 3 5V9H5V5H19V19H5V15H3V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" />
      </g>
      <defs>
        <clipPath id="clip0_3146_21730">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default ExitToApp;
