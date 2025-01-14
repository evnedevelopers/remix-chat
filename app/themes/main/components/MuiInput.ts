import { Components, Theme } from '@mui/material';

export const MuiInput: Partial<Components<Theme>> = {
  MuiInput: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          borderRadius: '20px',
          background: theme.palette.common.surface['surface 5'],
          minWidth: '50px',
          border: 'none',
          padding: '16px 0',
          '&:before': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '&:after': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .MuiInputBase-input': {
            '&::placeholder': {
              color: theme.palette.text.disabled,
              opacity: 1,
              fontWeight: 500,
              fontSize: '20px',
            },
          },
          '& + .MuiFormHelperText-root': {
            margin: 0,
          },
        };
      },
      focused: ({ theme }) => ({
        backgroundColor: theme.palette.common.black,
        '& fieldset': {
          '&.MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
      }),
    },
  },
};
