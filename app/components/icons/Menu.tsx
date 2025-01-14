import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Menu: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
    </SvgIcon>
  );
};

export default Menu;
