import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ArrowLeft: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M14 7L9 12L14 17V7Z" />
    </SvgIcon>
  );
};

export default ArrowLeft;
