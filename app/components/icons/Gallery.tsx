import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Gallery: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5 5C22.5 3.61929 21.3807 2.5 20 2.5H9C7.61929 2.5 6.5 3.61929 6.5 5V13C6.5 14.3807 7.61929 15.5 9 15.5H20C21.3807 15.5 22.5 14.3807 22.5 13V5ZM20 3.5C20.8284 3.5 21.5 4.17157 21.5 5V13C21.5 13.8284 20.8284 14.5 20 14.5H9C8.17157 14.5 7.5 13.8284 7.5 13V5C7.5 4.17157 8.17157 3.5 9 3.5H20Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 9.5H7V8.5H4C2.61929 8.5 1.5 9.61929 1.5 11V17C1.5 18.3807 2.61929 19.5 4 19.5H13C14.3807 19.5 15.5 18.3807 15.5 17V15H14.5V17C14.5 17.8284 13.8284 18.5 13 18.5H4C3.17157 18.5 2.5 17.8284 2.5 17V11C2.5 10.1716 3.17157 9.5 4 9.5Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 6.29289L19.3536 14.6464L18.6465 15.3536L11 7.70711L7.35359 11.3536L6.64648 10.6464L11 6.29289Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 7.29289L22.3536 11.6464L21.6465 12.3536L18 8.70711L15.3536 11.3536L14.6465 10.6464L18 7.29289Z"
      />
    </SvgIcon>
  );
};

export default Gallery;
