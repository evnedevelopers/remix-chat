import { Theme } from '@mui/material';

export const styles = {
  messageItemFile: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: '8px',
  },
  wrapper: (theme: Theme) => ({
    background: theme.palette.common.surface['surface 2'],
    padding: '10px',
    borderRadius: '10px 0px 10px 10px',
    display: 'flex',
    width: 'fit-content',
  }),
};
