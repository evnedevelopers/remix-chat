import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const FolderOpen: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18Z" />
    </SvgIcon>
  );
};

export default FolderOpen;
