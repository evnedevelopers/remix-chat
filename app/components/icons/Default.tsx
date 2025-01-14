import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const Default: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M16.6443 7.79043C16.6443 7.67257 16.5478 7.57614 16.43 7.57614L14.6621 7.58418L11.9996 10.7583L9.3398 7.58686L7.56927 7.57882C7.45141 7.57882 7.35498 7.67257 7.35498 7.79311C7.35498 7.844 7.37373 7.89221 7.40587 7.93239L10.8907 12.0842L7.40587 16.2333C7.37351 16.2725 7.35555 16.3217 7.35498 16.3726C7.35498 16.4904 7.45141 16.5869 7.56927 16.5869L9.3398 16.5788L11.9996 13.4047L14.6594 16.5761L16.4273 16.5842C16.5452 16.5842 16.6416 16.4904 16.6416 16.3699C16.6416 16.319 16.6228 16.2708 16.5907 16.2306L13.1112 12.0815L16.5961 7.92971C16.6282 7.89221 16.6443 7.84132 16.6443 7.79043Z" />
    </SvgIcon>
  );
};

export default Default;
