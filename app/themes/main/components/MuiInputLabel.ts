import { Components, Theme } from '@mui/material';

export const MuiInputLabel: Partial<Components<Theme>> = {
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: 'Montserrat, sans-serif',
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: '16px',
        left: '2px',
        transform: 'translate(14px, 12px) scale(1)',
        maxWidth: 'calc(100% - 24px)',
        '&.Mui-focused': {
          color: theme.palette.text.disabled,
          transform: 'translate(12px, -6px)',
          background: theme.palette.common.surface['surface 5'],
          padding: '0 4px',
          fontSize: '10px',
          textTransform: 'uppercase',
        },
        '&.Mui-disabled': {
          display: 'none',
        },
        '& .MuiFormLabel-asterisk': {
          color: theme.palette.error.main,
        },
      }),
      outlined: ({ theme }) => ({
        '&.MuiFormLabel-filled': {
          color: theme.palette.text.disabled,
          transform: 'translate(12px, -6px)',
          background: theme.palette.common.surface['surface 5'],
          padding: '0 4px',
          fontSize: '10px',
          textTransform: 'uppercase',
        },
      }),
    },
  },
};
