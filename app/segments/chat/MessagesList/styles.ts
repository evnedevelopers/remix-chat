import { Theme } from '@mui/material/styles';

export const styles = {
  messagesList: (theme: Theme, size: number) => ({
    width: '100%',
    transform: 'rotate(180deg)',
    direction: 'rtl',
    display: 'flex',
    justifyContent: 'center',
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
  list: {
    '& > div': {
      maxWidth: '1180px',
      width: '100%',
    },
    // maxWidth: '1180px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
