import React from 'react';

import { SvgIcon, SvgIconProps, useTheme } from '@mui/material';

const Ai2Ai: React.FC<SvgIconProps> = (props) => {
  const theme = useTheme();

  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_3460_105576)">
          <circle cx="6.5" cy="6.5" r="4" stroke={theme.palette.text.primary} />
          <circle
            cx="6.5"
            cy="17.5"
            r="4"
            stroke={theme.palette.text.primary}
          />
          <circle
            cx="17.5"
            cy="6.5"
            r="4"
            stroke={theme.palette.text.primary}
          />
          <circle
            cx="17.5"
            cy="17.5"
            r="4"
            stroke={theme.palette.text.primary}
          />
          <circle cx="12" cy="12" r="8.5" stroke={theme.palette.text.primary} />
        </g>
        <defs>
          <clipPath id="clip0_3460_105576">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default Ai2Ai;
