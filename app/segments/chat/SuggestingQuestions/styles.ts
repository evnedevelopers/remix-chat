import { Theme } from '@mui/material/styles';

export const styles = {
  suggestingQuestions: {
    mt: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: (theme: Theme) => ({
    height: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    padding: '8px',
    transition: 'all 0.3s ease-out',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.action.hover,
    },
    '& .MuiTypography-root': {
      fontSize: '12px',
      lineHeight: '14.63px',
    },
  }),
};
