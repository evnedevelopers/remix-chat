import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Tag: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M20 10V8H16V4H14V8H10V4H8V8H4V10H8V14H4V16H8V20H10V16H14V20H16V16H20V14H16V10H20ZM14 14H10V10H14V14Z" />
    </SvgIcon>
  );
};

export default Tag;
