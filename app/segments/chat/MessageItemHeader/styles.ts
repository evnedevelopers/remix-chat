import { Theme } from '@mui/material/styles';

export const styles = {
  messageItemHeader: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-start',
  },
  human: {
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
  },
  logo: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    overflow: 'hidden',
    '& img': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  button: (theme: Theme) => ({
    '&.Mui-disabled': {
      border: 'none',
      '& svg': {
        '& path': {
          fill: theme.palette.text.disabled,
        },
      },
    },
  }),
  popular: (theme: Theme) => ({
    display: 'flex',
    padding: '6px 8px',
    borderRadius: '6px',
    background: theme.palette.common.success.main,
  }),
  title: (theme: Theme) => ({
    background: theme.palette.common.surface.contrast,
  }),
  wrapper: {
    display: 'flex',
    width: '32px',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
  },
};
