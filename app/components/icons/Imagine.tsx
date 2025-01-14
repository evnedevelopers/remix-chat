import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Imagine: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M12 3L14.4308 9.56918L21 12L14.4308 14.4308L12 21L9.56918 14.4308L3 12L9.56918 9.56918L12 3Z" />
      <path d="M20.5 0L21.4453 2.55468L24 3.5L21.4453 4.44532L20.5 7L19.5547 4.44532L17 3.5L19.5547 2.55468L20.5 0Z" />
    </SvgIcon>
  );
};

export default Imagine;
