import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const ImageFaceSwap: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2H16.5V4H4V16.5H2V2ZM56 4H43.5V2H58V16.5H56V4ZM4 56V43.5H2V58H16.5V56H4ZM56 56V43.5H58V58H43.5V56H56Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47 17H13V43H47V17ZM11 15V45H49V15H11Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.0163 28.1021L48.7072 37.7929L47.293 39.2071L38.9838 30.898L27.9838 41.398L21.0001 34.4142L12.7072 42.7071L11.293 41.2929L21.0001 31.5858L28.0163 38.6021L39.0163 28.1021Z"
      />
      <path d="M25.8519 21.2239L28.5593 23.2713L31.9277 22.8519L29.8802 25.5593L30.2997 28.9277L27.5923 26.8802L24.2239 27.2997L26.2714 24.5923L25.8519 21.2239Z" />
    </SvgIcon>
  );
};

export default ImageFaceSwap;
