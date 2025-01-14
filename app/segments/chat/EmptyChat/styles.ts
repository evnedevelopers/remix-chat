import { Theme } from '@mui/material/styles';

export const styles = {
  emptyChat: (theme: Theme, size: number) => ({
    position: 'relative',
    width: '100%',
    height: `calc(100svh - 80px - 52.5px - ${size}px)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'overlay',
    justifyContent: 'center',
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.action.disabled,
      borderRadius: '10px',
    },
    padding: '20px',
  }),
};
