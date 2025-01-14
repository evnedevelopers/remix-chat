import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Chat3: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 4C1 2.89543 1.89543 2 3 2H14.8224C15.927 2 16.8224 2.89543 16.8224 4V12.8263C16.8224 13.9308 15.927 14.8263 14.8224 14.8263L10.0815 14.8263L5.57143 18.3463V14.8263H3C1.89543 14.8263 1 13.9308 1 12.8263V4ZM18.2162 6.44785H21C22.1046 6.44785 23 7.34328 23 8.44785V17.2432C23 18.3478 22.1046 19.2432 21 19.2432H18.5985V23.1154L13.8012 19.2432H9.41036C8.87992 19.2432 8.37122 19.0325 7.99615 18.6574L7.82572 18.487L9.23993 17.0728L9.41036 17.2432L13.8012 17.2432C14.2583 17.2432 14.7017 17.3998 15.0574 17.6869L16.5985 18.9308V17.2432H21V8.44785H18.2162V6.44785Z"
      />
    </SvgIcon>
  );
};

export default Chat3;
