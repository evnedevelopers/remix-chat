import { Theme } from '@mui/material/styles';

export const styles = {
  root: (theme: Theme) => ({
    background: theme.palette.common.surface['surface 2'],
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  error: (theme: Theme) => ({
    background: theme.palette.error.light,
  }),
  itemButton: {
    padding: 0,
    width: 20,
    height: 20,
  },
};
