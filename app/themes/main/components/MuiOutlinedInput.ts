import { Components, Theme } from '@mui/material';

export const MuiOutlinedInput: Partial<Components<Theme>> = {
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        top: 0,
        border: 'none',
      },
      root: ({ theme }) => {
        return {
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          borderRadius: '20px',
          background: theme.palette.common.surface['surface 5'],
          minWidth: '50px',
          border: 'none',
          paddingLeft: '8px',
          '& .MuiInputBase-input': {
            padding: '9px 8px 10px 8px',
            '&::placeholder': {
              color: theme.palette.text.primary,
              opacity: 1,
            },
          },
          '& legend': {
            display: 'none',
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
    variants: [
      {
        props: { size: 'small' },
        style: {},
      },
      {
        props: { multiline: true },
        style: ({ theme }) => ({
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          borderRadius: 0,
          background: theme.palette.common.surface['surface 5'],
          color: theme.palette.text.primary,
          minWidth: '50px',
          border: 'none',
          paddingLeft: '60px',
          '& .MuiInputBase-input.MuiOutlinedInput-input': {
            padding: 0,
          },
        }),
      },
      {
        props: { size: 'medium' },
        style: ({ theme }) => ({
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '19.5px',
          borderRadius: '10px',
          background: theme.palette.common.surface['surface 5'],
          color: theme.palette.text.primary,
          minWidth: '50px',
          border: `1px solid ${theme.palette.divider}`,
          paddingLeft: '8px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            border: `1px solid ${theme.palette.text.primary}`,
          },
          '&.Mui-error': {
            border: `1px solid ${theme.palette.error.main}`,
          },
          '&.Mui-focused': {
            border: `1px solid ${theme.palette.text.primary}`,
          },
          '&.Mui-disabled': {
            background: theme.palette.action.disabledBackground,
            color: theme.palette.text.primary,
          },
          '& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
            WebkitTextFillColor: theme.palette.text.primary,
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.common.surface['surface 5']} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            border: 'none',
            outline: 'none',
            '&:hover, &:focus, &:active': {
              border: 'none',
              outline: 'none',
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.common.surface['surface 5']} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
            },
          },
        }),
      },
    ],
  },
};
