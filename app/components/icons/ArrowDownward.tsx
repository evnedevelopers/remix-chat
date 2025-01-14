import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ArrowDownward: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M20 12L18.59 10.59L13 16.17V4H11V16.17L5.42 10.58L4 12L12 20L20 12Z" />
    </SvgIcon>
  );
};

export default ArrowDownward;
