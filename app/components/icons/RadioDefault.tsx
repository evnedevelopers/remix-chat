import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const RadioDefault: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9.5" stroke="white" />
      </svg>
    </SvgIcon>
  );
};

export default RadioDefault;
