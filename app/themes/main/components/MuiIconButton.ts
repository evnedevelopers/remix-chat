import { Components, Theme } from '@mui/material';

export const MuiIconButton: Partial<Components<Theme>> = {
  MuiIconButton: {
    defaultProps: {
      disableRipple: true,
      size: 'medium',
      color: 'primary',
    },
    variants: [
      {
        props: { color: 'primary' },
        style: ({ theme }) => ({
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'none',
          '&:hover': {
            background: theme.palette.action.hover,
          },
          '&.Mui-disabled': {
            border: `1px solid ${theme.palette.divider}`,
          },
        }),
      },
      {
        props: { color: 'secondary' },
        style: ({ theme }) => ({
          width: '60px',
          height: '60px',
          borderRadius: '10px',
          background: 'none',
          '&:hover': {
            background: theme.palette.action.hover,
          },
          '&.Mui-disabled': {
            '& svg': {
              '& path': {
                fill: theme.palette.text.disabled,
              },
            },
          },
        }),
      },
      {
        props: { color: 'default' },
        style: ({ theme }) => ({
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: theme.palette.common.action['normal 2'],
          '&:hover': {
            background: theme.palette.action.hover,
            '& svg': {
              '& path': {
                fill: theme.palette.text.primary,
              },
            },
          },
          '& svg': {
            '& path': {
              fill: theme.palette.text.primary,
            },
          },
          '&.Mui-disabled': {
            background: 'none',
            border: `1px solid ${theme.palette.divider}`,
            '& svg': {
              '& path': {
                fill: theme.palette.text.disabled,
              },
            },
          },
        }),
      },
      {
        props: { color: 'success' },
        style: ({ theme }) => ({
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: 'none',
          '&:hover': {
            background: theme.palette.action.hover,
          },
          '& svg': {
            '& path': {
              fill: theme.palette.text.secondary,
            },
          },
          '&.Mui-disabled': {
            background: 'none',
            border: `1px solid ${theme.palette.divider}`,
            '& svg': {
              '& path': {
                fill: theme.palette.text.disabled,
              },
            },
          },
        }),
      },
      {
        props: { color: 'info' },
        style: ({ theme }) => ({
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: theme.palette.common.action['normal 2'],
          '&.Mui-disabled': {
            background: 'none',
            border: `1px solid ${theme.palette.divider}`,
            '& svg': {
              '& path': {
                fill: theme.palette.text.disabled,
              },
            },
          },
        }),
      },
      {
        props: { color: 'warning' },
        style: ({ theme }) => ({
          width: '44px',
          height: '44px',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
          background: 'none',
          '&:hover': {
            border: `1px solid ${theme.palette.action.hover}`,
            background: theme.palette.action.hover,
          },
          '&:focus': {
            border: `1px solid ${theme.palette.action.selected}`,
            background: theme.palette.action.selected,
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            background: 'none',
          },
          '& .MuiButton-endIcon': {
            marginLeft: '16px',
          },
        }),
      },
      {
        props: { color: 'inherit' },
        style: ({ theme }) => ({
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          border: `1px solid ${theme.palette.divider}`,
          '& svg': {
            '& path': {
              fill: theme.palette.text.secondary,
            },
          },
          '&:hover': {
            background: theme.palette.action.hover,
            '& svg': {
              '& path': {
                fill: theme.palette.text.secondary,
              },
            },
          },
          '&:active': {
            border: `1px solid ${theme.palette.common.surface.contrast}`,
            background: theme.palette.common.surface.contrast,
            '& svg': {
              '& path': {
                fill: theme.palette.primary.contrastText,
              },
            },
          },
          '&.Mui-disabled': {
            background: 'none',
            border: `none`,
            '& svg': {
              '& path': {
                fill: theme.palette.text.disabled,
              },
            },
          },
        }),
      },
    ],
  },
};
