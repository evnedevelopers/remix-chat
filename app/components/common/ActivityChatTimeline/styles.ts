import { Theme } from '@mui/material/styles';

export const styles = {
  item: {
    '& .MuiButtonBase-root': {
      padding: '12px 16px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '8px',
    },
  },
  activeItem: (theme: Theme) => ({
    background: theme.palette.common.action['hover 3'],
  }),
  button: {
    border: 'none!important',
  },
};
