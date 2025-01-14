import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Pause: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" />
    </SvgIcon>
  );
};

export default Pause;
