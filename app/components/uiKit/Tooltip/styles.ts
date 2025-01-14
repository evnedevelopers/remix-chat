import { Theme } from '@mui/material/styles';

export const styles = {
  tooltip: {
    '& .MuiTooltip-tooltip': {
      padding: 0,
      borderRadius: '10px',
      backgroundColor: 'none',
    },
  },
  arrow: (theme: Theme) => ({
    background: theme.palette.background.paper,
  }),
  dark: {
    background: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
};
