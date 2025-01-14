import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Generate: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_2079_73428)">
        <path d="M13.4599 7.27028L17.9028 10.6303L23.4306 9.94192L20.0705 14.3849L20.7589 19.9126L16.316 16.5526L10.7882 17.241L14.1482 12.798L13.4599 7.27028Z" />
        <path d="M3.84923 2.27465L6.55662 4.32214L9.92504 3.90266L7.87755 6.61005L8.29703 9.97847L5.58963 7.93098L2.22122 8.35046L4.2687 5.64307L3.84923 2.27465Z" />
        <path d="M4.25002 17.3349L5.77178 18.4858L7.66509 18.25L6.51425 19.7718L6.75002 21.6651L5.22826 20.5142L3.33496 20.75L4.4858 19.2282L4.25002 17.3349Z" />
      </g>
      <defs>
        <clipPath id="clip0_2079_73428">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default Generate;
