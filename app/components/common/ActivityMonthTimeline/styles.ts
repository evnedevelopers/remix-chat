import { Theme } from '@mui/material';

export const styles = {
  datasetItem: (theme: Theme) => ({
    width: '100%',
    borderRadius: '8px',
    background: 'none',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: 0,
    },
    '& .MuiCollapse-root': {
      position: 'relative',
      borderBottom: 'none',
    },
    '&.MuiPaper-root': {
      borderRadius: '8px',
    },
    '& .MuiButtonBase-root': {
      height: '56px',
      position: 'relative',
      borderRadius: '8px',
      border: `1px solid ${theme.palette.divider}`,
    },
  }),
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
      marginRight: '16px',
      my: '15px',
      transform: 'rotate(90deg)',
      '&.Mui-expanded': {
        transform: 'rotate(-90deg)',
      },
    },
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
  },
  details: {
    mt: '16px',
    padding: 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: 0,
  },
  activeItem: {},
  active: (theme: Theme) => ({
    '& > .MuiButtonBase-root': {
      background: theme.palette.common.action['hover 3'],
    },
  }),
  item: {
    '& .MuiButtonBase-root': {
      padding: '12px 16px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
    },
  },
};
