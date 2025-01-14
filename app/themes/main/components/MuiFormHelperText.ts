import { Components, Theme } from '@mui/material';

export const MuiFormHelperText: Partial<Components<Theme>> = {
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: 'Montserrat, sans-serif',
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '14.63px',
        maxWidth: 'calc(100% - 24px)',
        margin: '0 0 0 16px',
      }),
    },
  },
};
