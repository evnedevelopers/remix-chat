import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const KeyboardArrowRight: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M8.58997 16.59L13.17 12L8.58997 7.41L9.99997 6L16 12L9.99997 18L8.58997 16.59Z" />
    </SvgIcon>
  );
};

export default KeyboardArrowRight;
