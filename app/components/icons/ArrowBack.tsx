import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ArrowBack: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" />
    </SvgIcon>
  );
};

export default ArrowBack;
