import { Theme } from '@mui/material';

export const styles = {
  aIHistory: (theme: Theme) => ({
    borderRadius: '0',
    background: 'none',
    boxShadow: 'none',
    border: 'none',
    '&:before': {
      display: 'none',
    },
    '&:first-of-type': {
      borderRadius: '0',
    },
    '&:last-of-type': {
      borderRadius: '0',
    },
    '&.Mui-expanded': {
      margin: 0,
    },
    '& > .MuiCollapse-root': {
      mt: '-2px',
      position: 'absolute',
      zIndex: 3,
      background: theme.palette.common.surface['surface 5'],
      visibility: 'visible',
      width: '100%',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  titleWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: '20px',
  },
  summary: {
    height: '100%',
    padding: 0,
    minHeight: 'initial',
    '&.Mui-expanded': {
      minHeight: 'initial',
    },
    '& .MuiAccordionSummary-content': {
      height: '100%',
      margin: 0,
      '&.Mui-expanded': {
        margin: 0,
      },
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      marginRight: '20px',
      // transform: 'rotate(-90deg)',
      '&.Mui-expanded': {
        // transform: 'rotate(0deg)',
      },
    },
  },
  details: (theme: Theme) => ({
    padding: 0,
    [theme.breakpoints.down('md')]: {
      overflow: 'scroll',
      height: 'calc(100svh - 60px - 80px)',
    },
  }),
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '20px',
    '& .swiper': {
      width: '100%',
      m: 0,
      '& .swiper-slide': {
        maxWidth: '270px',
        width: '100%',
      },
    },
  },
  item: {
    borderRadius: '16px',
    maxWidth: '270px',
    overflow: 'hidden',
    height: '100%',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: (theme: Theme) => ({
    background: `linear-gradient(270deg, ${theme.palette.common.surface['surface 5']} 57.64%, rgba(241, 250, 255, 0.00) 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '8px',
    right: 0,
    px: '8px',
    '& button': {
      background: theme.palette.common.surface['surface 1'],
      borderRadius: '50%',
      width: '40px',
      height: '40px',
    },
  }),
  button: (theme: Theme) => ({
    height: 'unset',
    minWidth: 'unset',
    padding: 0,
    '& span, p': {
      transition: 'all 0.3s ease-in-out',
    },
    '&:hover': {
      '& span, p': {
        color: theme.palette.text.secondary,
      },
    },
  }),
  button2: (theme: Theme) => ({
    height: 'unset',
    minWidth: 'unset',
    padding: '7.5px 2.5px',
    '& span, p': {
      transition: 'all 0.3s ease-in-out',
    },
    '&:hover': {
      '& span, p': {
        color: theme.palette.text.secondary,
      },
    },
  }),
  createButton: (theme: Theme) => ({
    position: 'relative',
    width: '66px',
    height: '66px',
    background: 'none',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '16px',
    overflow: 'hidden',
  }),
  active: (theme: Theme) => ({
    '& span, p': {
      color: theme.palette.text.primary,
    },
  }),
  month: (theme: Theme) => ({
    px: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '&': {
      [theme.breakpoints.down('md')]: {
        overflowX: 'visible',
        flexDirection: 'column',
        gap: '16px',
        pb: '20px',
      },
    },
  }),
};
