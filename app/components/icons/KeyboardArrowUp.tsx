import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const KeyboardArrowUp: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z" />
    </SvgIcon>
  );
};

export default KeyboardArrowUp;
