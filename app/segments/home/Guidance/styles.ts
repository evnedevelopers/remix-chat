import { Theme } from '@mui/material';

export const styles = {
  guidance: (theme: Theme) => ({
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
    borderTop: `1px solid ${theme.palette.divider}`,
    '& .MuiCollapse-root': {
      transition: 'height 0.5s ease!important',
    },
  }),
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    p: '16px 16px 16px 16px',
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
      transform: 'rotate(-180deg)',
      '&.Mui-expanded': {
        transform: 'rotate(0deg)',
      },
    },
  },
  details: {
    padding: 0,
  },
  list: {
    display: 'flex',
    gap: '16px',
    p: '0 16px 16px',
    overflowX: 'scroll',
    position: 'relative',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  slide: {
    width: '0',
    margin: 0,
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
};
