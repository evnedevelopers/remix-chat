import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Plus: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_708_50349)">
        <rect x="11" y="4" width="2" height="16" />
        <rect
          x="20"
          y="11"
          width="2"
          height="16"
          transform="rotate(90 20 11)"
        />
      </g>
    </SvgIcon>
  );
};

export default Plus;
