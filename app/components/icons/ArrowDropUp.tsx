import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ArrowDropUp: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M7 14L12 9L17 14H7Z" />
    </SvgIcon>
  );
};

export default ArrowDropUp;
