import { Theme } from '@mui/material';

export const styles = {
  root: {
    height: 'calc(100svh - 80px)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messenger: (theme: Theme, size: number) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'overlay',
    WebkitOverflowScrolling: 'touch',
    height: `calc(100svh - 80px - 52.5px - ${size}px)`,
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.action.disabled,
      borderRadius: '10px',
    },
  }),
  iconButton: {
    maxWidth: '1180px',
    px: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'fixed',
    zIndex: 99,
    pointerEvents: 'none',
    '& button': {
      pointerEvents: 'auto',
    },
  },
  title: (theme: Theme) => ({
    width: '100%',
    display: 'flex',
    padding: '20px 60px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  head: {
    width: '100%',
    transition: 'all 0.3s ease',
    top: '0px',
    position: 'relative',
  },
  action: {
    background: 'none',
    '&:hover': {
      background: 'none',
    },
  },
};
