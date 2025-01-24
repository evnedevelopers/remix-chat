import React from 'react';

import { Grid as MuiGrid, GridProps as MuiGridPros } from '@mui/material';

interface GridProps extends MuiGridPros {
  xxl?: number | boolean;
}

export const Grid: React.FC<GridProps> = ({ xxl, ...props }) => {
  const xxlClass = `MuiGrid-grid-xxl-${xxl}`;

  return <MuiGrid className={xxlClass} {...props} />;
};
