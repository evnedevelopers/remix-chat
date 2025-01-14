import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Saved: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.7719L14.8256 8.11088L21.7275 8.83934L16.5719 13.4855L18.0119 20.2747L12 16.8072L5.98803 20.2747L7.42803 13.4855L2.27246 8.83934L9.17435 8.11088L12 1.7719ZM12 4.22809L9.8529 9.04482L4.60844 9.59834L8.52594 13.1288L7.43175 18.2876L12 15.6528L16.5682 18.2876L15.474 13.1288L19.3915 9.59834L14.147 9.04482L12 4.22809Z"
      />
    </SvgIcon>
  );
};

export default Saved;
