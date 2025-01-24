import { Theme } from '@mui/material/styles';

export const styles = {
  root: (theme: Theme) => ({
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '16px',
    width: '320px',
    flexShrink: 0,
    height: '100%',
    background: theme.palette.common.surface['surface 5'],
    '&:hover': {
      boxShadow: 'none',
      background: theme.palette.common.action['hover 3'],
    },
  }),
  guidanceContent: (theme: Theme) => ({
    padding: '16px',
    background: 'none',
    borderRadius: '16px',
    height: '120px',
    overflowY: 'hidden',
    // '&::-webkit-scrollbar': {
    //   width: '2px',
    //   height: '5px',
    // },
    // '&::-webkit-scrollbar-thumb': {
    //   background: theme.palette.action.disabled,
    //   borderRadius: '10px',
    // },
  }),
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    mb: '8px',
  },
};
