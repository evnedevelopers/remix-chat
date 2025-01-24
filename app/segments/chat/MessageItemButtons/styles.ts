import { Theme } from '@mui/material';

export const styles = {
  messageItemButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: '16px',
    gap: '10px',
  },
  playing: (theme: Theme) => ({
    '&.Mui-disabled': {
      border: `1px solid ${theme.palette.primary.main}`,
      background: theme.palette.primary.main,
      '& svg': {
        '& path': {
          fill: theme.palette.primary.contrastText,
        },
      },
    },
    border: `1px solid ${theme.palette.common.surface.contrast}`,
    background: theme.palette.common.surface.contrast,
    '& svg': {
      '& path': {
        fill: theme.palette.primary.contrastText,
      },
    },
  }),
  imageButton: (theme: Theme) => ({
    minWidth: 'initial',
    padding: '8px',
    '& .MuiButton-startIcon': {
      m: 0,
    },
    '&.Mui-disabled': {
      border: 'none',
      '& .MuiButton-startIcon': {
        '& svg': {
          '& path': {
            fill: theme.palette.text.disabled,
          },
        },
      },
    },
  }),
  progress: (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),
};
