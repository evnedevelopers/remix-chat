import { Theme } from '@mui/material';

export const styles = {
  messageItem: (theme: Theme) => ({
    transform: 'rotate(180deg)',
    direction: 'ltr',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80%',
    width: '100%',
    background: 'none',
    padding: '40px 0',
    [theme.breakpoints.down('lg')]: {
      padding: '40px 20px',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  }),
  messageItemAi: {
    maxWidth: '100%',
  },
  human: {
    justifyContent: 'flex-end',
  },
  messageItemHuman: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  messageHuman: (theme: Theme) => ({
    minWidth: '90px',
    padding: '20px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px 0px 10px 10px',
  }),
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
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  button: {
    alignSelf: 'center',
    maxWidth: '205px',
    width: '100%',
    padding: '14px 16px',
    mt: '20px',
  },
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
