import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Tetragrammaton: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_2156_91656)">
        <g clipPath="url(#clip1_2156_91656)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9999 3.34335L22.8048 20.5326H1.19507L11.9999 3.34335ZM3.0048 19.5326H20.9951L11.9999 5.22242L3.0048 19.5326Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9998 7.8506L18.4826 18.1629H5.51709L11.9998 7.8506ZM7.32691 17.1629H16.6728L11.9998 9.72955L7.32691 17.1629Z"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2156_91656">
          <rect
            width="21.6"
            height="21.6"
            transform="translate(1.19995 1.35773)"
          />
        </clipPath>
        <clipPath id="clip1_2156_91656">
          <rect
            width="21.6"
            height="21.6"
            transform="translate(1.19995 1.35773)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default Tetragrammaton;
