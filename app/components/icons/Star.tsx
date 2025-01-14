import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Star: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </SvgIcon>
  );
};

export default Star;
