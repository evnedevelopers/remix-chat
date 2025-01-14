import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Expand: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M6.2534 12.5C6.82681 12.5 7.29166 12.9648 7.29166 13.5383L7.29166 17.7083L11.4583 17.7083C12.0336 17.7083 12.5 18.1747 12.5 18.75C12.5 19.3253 12.0336 19.7917 11.4583 19.7917L5.20832 19.7917L5.21514 13.5371C5.21576 12.9642 5.68042 12.5 6.2534 12.5Z" />
      <path d="M18.7466 12.5C18.1732 12.5 17.7083 12.0352 17.7083 11.4617L17.7083 7.29166L13.5417 7.29166C12.9664 7.29166 12.5 6.8253 12.5 6.25C12.5 5.6747 12.9664 5.20833 13.5417 5.20833L19.7917 5.20833L19.7848 11.4629C19.7842 12.0358 19.3196 12.5 18.7466 12.5Z" />
    </SvgIcon>
  );
};

export default Expand;
