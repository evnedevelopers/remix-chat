import { Theme } from '@mui/material';

export const styles = {
  messageInput: (theme: Theme) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  removeAudio: (theme: Theme) => ({
    ml: '60px',
    [theme.breakpoints.down('md')]: {
      ml: '20px',
    },
  }),
  wrapper: (theme: Theme) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    pr: '20px',
    minHeight: '80px',
    [theme.breakpoints.down('lg')]: {
      pr: '20px',
    },
  }),
  recording: (theme: Theme) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    pr: '46px',
    minHeight: '100px',
    [theme.breakpoints.down('lg')]: {
      pr: '20px',
    },
  }),
  animated: (theme: Theme) => ({
    justifyContent: 'center',
    p: 0,
    [theme.breakpoints.down('lg')]: {
      px: '20px',
    },
  }),
  input: (theme: Theme) => ({
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      top: '45px',
      left: '60px',
      margin: 0,
      [theme.breakpoints.down('lg')]: {
        left: '20px',
      },
      '&.Mui-focused': {
        display: 'none',
      },
      '&.MuiFormHelperText-filled': {
        display: 'none',
      },
    },
    '& .MuiInputBase-root': {
      border: 'none',
      paddingLeft: '20px',
      background: theme.palette.common.surface['surface 5'],
      '& textarea': {
        '&::-webkit-input-placeholder': {
          color: theme.palette.text.disabled,
        },
        '&:-moz-placeholder': {
          /* Firefox 18- */
          color: theme.palette.text.disabled,
        },
        '&::-moz-placeholder': {
          /* Firefox 19+ */
          color: theme.palette.text.disabled,
        },
        '&:-ms-input-placeholder': {
          color: theme.palette.text.disabled,
        },
      },
      '&.Mui-focused': {
        border: 'none',
      },
      '&.MuiOutlinedInput-root': {
        '&:hover': {
          border: `none`,
        },
      },
    },
    '& .Mui-disabled': {
      background: theme.palette.common.surface['surface 5'],
    },
  }),
  inputWrapper: {
    flex: 1,
  },
};
