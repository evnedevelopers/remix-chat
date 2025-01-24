import { Theme } from '@mui/material/styles';

export const styles = {
  guidanceItem: (theme: Theme) => ({
    overflow: 'hidden',
    height: '100%',
    // width: '100%',
    width: '320px',
    transition: 'width 0.5s ease',
    background: 'none',
    display: 'flex',
    alignItems: 'flex-start',
    boxShadow: 'none',
    // transition: 'none',
    cursor: 'pointer',
    borderRadius: '16px',
    border: `1px solid ${theme.palette.divider}`,
  }),
  subGuideContainer: {
    // width: '100%',
    // height: '100%',
    // display: 'flex',
    // overflow: 'hidden',
    // transition: 'all 3s ease',
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    transition: 'transform 0.5s ease', // время анимации можно настроить
    transform: 'translateX(-100%)', // начальное смещение элемента влево, скрывая его
  },
  subGuideContainerActive: {
    transform: 'translateX(0%)', // смещение элемента обратно в начальное положение
  },
  withSubItem: {
    '&.Mui-expanded': {
      '&:hover': {
        boxShadow: '0px 2px 8px rgba(30, 6, 39, 0.2)',
      },
    },
  },
  guidanceItemTitle: {
    height: '100%',
    padding: 0,
    minHeight: 'initial',
    '&.Mui-disabled': {
      opacity: 1,
      cursor: 'pointer',
      pointerEvents: 'all',
    },
    '&.Mui-expanded': {
      minHeight: 'initial',
    },
    '& .MuiAccordionSummary-content': {
      height: '100%',
      margin: 0,
      flexDirection: 'column',
      '&.Mui-expanded': {
        margin: 0,
        '& > div': {
          '& .MuiSvgIcon-root': {
            transform: 'rotate(180deg)',
          },
        },
      },
    },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    mb: '8px',
  },
};
