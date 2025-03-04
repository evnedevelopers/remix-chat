import { Theme } from '@mui/material/styles';

export const styles = {
  root: (theme: Theme) => ({
    zIndex: 10005,
    '& .MuiDialog-paper': {
      border: `1px solid ${theme.palette.divider}`,
      overflow: 'unset',
      borderRadius: '10px',
      boxShadow:
        '0px 18px 114px rgba(30, 6, 39, 0.08), 0px 7.51997px 47.6265px rgba(30, 6, 39, 0.0575083), 0px 4.02054px 25.4634px rgba(30, 6, 39, 0.0476886), 0px 2.25388px 14.2746px rgba(30, 6, 39, 0.04), 0px 1.19702px 7.58112px rgba(30, 6, 39, 0.0323114), 0px 0.498106px 3.15467px rgba(30, 6, 39, 0.0224916)',
    },
    '& .MuiPaper-root': {
      overflowX: 'hidden',
      margin: '20px',
      maxWidth: 'initial',
      backgroundImage: 'none',
      background: theme.palette.common.surface['surface 5'],
    },
  }),
  titleSection: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 10px 10px 20px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  innerWrapper: {
    position: 'absolute',
  },
  secondary: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100% !important',
    margin: '0 !important',
    border: 'none !important',
    borderRadius: '0 !important',
    '& .titleSection': (theme: Theme) => ({
      position: 'relative',
      padding: '0  !important',
      borderBottom: 'none !important',
      '& .MuiIconButton-root': {
        position: 'absolute',
        top: '30px',
        right: 'calc((100vw - 1180px) / 2)',
        [theme.breakpoints.down('xl')]: {
          top: '15px',
          right: '15px',
        },
      },
    }),
  },
};
