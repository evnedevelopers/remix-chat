import { Theme } from '@mui/material/styles';

export const styles = {
  buttonWrapper: (theme: Theme) => ({
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
    p: '11px 20px',
    width: '100%',
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
};
