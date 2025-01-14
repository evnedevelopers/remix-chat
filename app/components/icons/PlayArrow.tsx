import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const PlayArrow: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M8 5V19L19 12L8 5Z" />
    </SvgIcon>
  );
};

export default PlayArrow;
