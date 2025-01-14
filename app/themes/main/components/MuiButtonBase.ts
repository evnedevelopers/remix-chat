import { Components, Theme } from '@mui/material';

export const MuiButton: Partial<Components<Theme>> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '50px',
        padding: '14px 10px',
        lineHeight: '16px',
        letterSpacing: '0.0125em',
        boxSizing: 'border-box',
        height: '44px',
      },
    },
    defaultProps: {
      variant: 'contained',
      color: 'primary',
      disableRipple: true,
      disableElevation: true,
    },
    variants: [
      {
        props: { variant: 'primary' },
        style: ({ theme }) => ({
          border: 'none',
          borderRadius: '10px',
          background: theme.palette.common.surface.contrast,
          color: theme.palette.primary.contrastText,
          padding: '14px 16px',
          '&:hover': {
            // background: theme.palette.primary.light,
            background: theme.palette.common.surface.contrast,
          },
          '&:focus': {
            border: 'none',
            // background: theme.palette.primary.main,
            background: theme.palette.common.surface.contrast,
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            background: theme.palette.action.disabled,
          },
        }),
      },
      {
        props: { variant: 'secondary' },
        style: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
          padding: '10px 16px',
          background: 'none',
          '&:hover': {
            background: theme.palette.action.hover,
          },
          '&:focus': {
            background: theme.palette.action.selected,
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            background: 'none',
          },
          '& .MuiButton-endIcon': {
            marginLeft: '8px',
          },
        }),
      },
      {
        props: { variant: 'secondary', color: 'secondary' },
        style: ({ theme }) => ({
          border: `none`,
          background: 'none',
          '&:hover': {
            border: `none`,
            background: 'none',
          },
          '&:focus': {
            border: `none`,
            background: 'none',
          },
          '&.Mui-disabled': {
            border: `none`,
            background: 'none',
          },
        }),
      },
      {
        props: { variant: 'tertiary' },
        style: ({ theme }) => ({
          border: `none`,
          borderRadius: '10px',
          background: theme.palette.common.action.normal,
          '&:hover': {
            background: theme.palette.common.action.hover,
          },
          '&:focus': {
            background: theme.palette.common.action.pressed,
          },
          '&.Mui-disabled': {
            background: theme.palette.action.disabled,
          },
          '& .MuiButton-endIcon': {
            marginLeft: '8px',
          },
        }),
      },
    ],
  },
};
