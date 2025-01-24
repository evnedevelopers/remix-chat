import { Theme } from '@mui/material';

export const styles = {
  messageTimeBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    py: '20px',
  },
  badge: (theme: Theme) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    padding: '10px',
  }),
  line: (theme: Theme) => ({
    width: '100%',
    height: '1px',
    background: theme.palette.divider,
  }),
};
