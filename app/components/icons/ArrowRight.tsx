import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ArrowRight: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 17L15 12L10 7V17Z" />
    </SvgIcon>
  );
};

export default ArrowRight;
