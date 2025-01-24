import { Theme } from '@mui/material/styles';

export const styles = {
  createChatButton: (theme: Theme) => ({
    minHeight: '117.5px',
    padding: '22px 20px',
    background: theme.palette.common.surface['surface 6'],
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      '& > div:first-of-type': {
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: '10px',
      },
      '& > .MuiTypography-root': {
        maxWidth: '100%',
      },
      '& button': {
        maxWidth: '100%',
        width: '100%',
      },
    },
  }),
  button: (theme: Theme) => ({
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: '13px',
      height: '42px',
    },
  }),
};
