import React, { FC } from 'react';

import { Box, Tooltip as MuiTooltip, useTheme } from '@mui/material';

import { styles } from './styles';

type TooltipProps = {
  children: React.ReactElement;
  title: React.ReactNode;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  id: string;
  open?: boolean;
  isBackground?: boolean;
  isOpacityBackground?: boolean;
  arrow?: boolean;
  zIndex?: number;
};

export const Tooltip: FC<TooltipProps> = ({
  title,
  children,
  placement,
  arrow = true,
  zIndex = 9997,
}) => {
  const theme = useTheme();


  const handleClose = () => {

  };

  const handleOpen = () => {
  };

  return (
    <MuiTooltip
      placement={placement}
      sx={{ height: '100%' }}
      componentsProps={{
        popper: {
          sx: {
            ...styles.tooltip,
            zIndex,
          },
        },
        arrow: {
          sx: {
            color: theme.palette.background.paper,
          },
        },
      }}
      title={title}
      arrow={arrow}
      onClose={handleClose}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={false}>
      <Box onClick={handleOpen} display={'flex'} width={'max-content'}>
        {children}
      </Box>
    </MuiTooltip>
  );
};

export default Tooltip;
