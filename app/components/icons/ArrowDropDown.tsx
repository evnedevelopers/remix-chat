import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ArrowDropDown: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M7 10L12 15L17 10H7Z" />
    </SvgIcon>
  );
};

export default ArrowDropDown;
