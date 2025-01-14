import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Send: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M4.01 6.03L11.52 9.25L4 8.25L4.01 6.03ZM11.51 14.75L4 17.97V15.75L11.51 14.75ZM2.01 3L2 10L17 12L2 14L2.01 21L23 12L2.01 3Z" />
    </SvgIcon>
  );
};

export default Send;
