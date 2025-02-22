import React from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material';

export interface IconButtonProps extends MuiIconButtonProps {}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  return <MuiIconButton {...props}>{children}</MuiIconButton>;
};
