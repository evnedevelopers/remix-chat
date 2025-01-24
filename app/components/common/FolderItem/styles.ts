import { Theme } from '@mui/material/styles';

export const styles = {
  folderItem: (theme: Theme) => ({
    border: `1px solid ${theme.palette.divider}`,
    background: 'none',
    color: theme.palette.primary.main,
    borderRadius: '16px',
    maxWidth: '270px',
    overflow: 'hidden',
    padding: '10px 10px 10px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease-in-out',
    height: '66px',
    '& button': {
      transition: 'all 0.3s ease-in-out',
      opacity: 0,
    },
    '&:hover': {
      background: theme.palette.common.action['hover 3'],
      '& button': {
        opacity: 1,
      },
    },
    '&:focus': {
      background: theme.palette.action.selected,
    },
    [theme.breakpoints.down('md')]: {
      '& button': {
        display: 'none',
      },
    },
  }),
  folderActive: (theme: Theme) => ({
    background: theme.palette.action.hover,
    [theme.breakpoints.down('md')]: {
      '& button': {
        display: 'flex',
        opacity: 1,
      },
    },
  }),
};