import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ChatBubbleOutline: React.FC<SvgIconProps> = (props) => {
  return (
    <div>
      <SvgIcon {...props}>
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" />
      </SvgIcon>
    </div>
  );
};

export default ChatBubbleOutline;
