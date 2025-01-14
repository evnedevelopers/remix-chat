import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const KeyboardArrowDown: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" />
    </SvgIcon>
  );
};

export default KeyboardArrowDown;
