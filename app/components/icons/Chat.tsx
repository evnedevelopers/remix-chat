import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Chat: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M4 4H20V16H5.17L4 17.17V4ZM4 2C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2H4ZM6 11H14V13H6V11ZM6 7H18V9H6V7Z" />
    </SvgIcon>
  );
};

export default Chat;
