import { Theme } from '@mui/material/styles';

export const styles = {
  stopButton: (theme: Theme) => ({
    width: '88px',
    height: '88px',
    borderRadius: '50%',
    background: theme.palette.common.surface.contrast,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  }),
};
