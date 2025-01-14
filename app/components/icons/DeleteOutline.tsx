import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const DeleteOutline: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" />
    </SvgIcon>
  );
};

export default DeleteOutline;
