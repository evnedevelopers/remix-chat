import React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

export const HumanIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 9C12.5 10.933 14.067 12.5 16 12.5C17.933 12.5 19.5 10.933 19.5 9C19.5 7.067 17.933 5.5 16 5.5C14.067 5.5 12.5 7.067 12.5 9ZM16 4C13.2386 4 11 6.23858 11 9C11 11.7614 13.2386 14 16 14C18.7614 14 21 11.7614 21 9C21 6.23858 18.7614 4 16 4Z"
        fillOpacity="0.87"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.25 27.1669V26C25.25 21.9959 22.0041 18.75 18 18.75C13.9959 18.75 10.75 21.9959 10.75 26V29.5204C12.3779 30.153 14.1484 30.5 16 30.5C19.516 30.5 22.7397 29.2486 25.25 27.1669ZM26.75 27.8508C29.9749 24.9237 32 20.6983 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 20.6983 2.02508 24.9237 5.25 27.8508C5.30522 27.9009 5.36079 27.9506 5.4167 28C8.23724 30.4895 11.9422 32 16 32C20.0578 32 23.7628 30.4895 26.5833 28C26.6392 27.9506 26.6948 27.9009 26.75 27.8508ZM5.25322 25.7345C5.39417 19.9201 10.1517 15.25 16 15.25C21.8483 15.25 26.6058 19.9201 26.7468 25.7345C29.0791 23.1612 30.5 19.7465 30.5 16C30.5 7.99187 24.0081 1.5 16 1.5C7.99187 1.5 1.5 7.99187 1.5 16C1.5 19.7465 2.9209 23.1612 5.25322 25.7345ZM19.2566 17.3396C18.2437 16.9585 17.1462 16.75 16 16.75C10.8914 16.75 6.75 20.8914 6.75 26V27.1669C7.52023 27.8056 8.35762 28.3661 9.25 28.8364V26C9.25 21.1675 13.1675 17.25 18 17.25C18.4267 17.25 18.8463 17.2805 19.2566 17.3396Z"
        fillOpacity="0.87"
      />
    </SvgIcon>
  );
};