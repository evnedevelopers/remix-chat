import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Stop: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M6 6H18V18H6V6Z" />
    </SvgIcon>
  );
};

export default Stop;
