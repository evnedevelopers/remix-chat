import { Theme } from '@mui/material';

export const styles = {
  messageActions: (isHuman: boolean) => ({
    ml: !isHuman ? '8px' : 0,
    mr: isHuman ? '8px' : 0,
    position: 'relative',
    display: 'flex',
    borderRadius: '10px',
    gap: '8px',
    transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
    left: isHuman ? 'unset' : 0,
    right: isHuman ? 0 : 'unset',
    transform: `translateX(${isHuman ? '50%' : '-50%'})`,
    opacity: 0,
    overflow: 'hidden',
  }),
  isOpen: {
    opacity: 1,
    transform: `translateX(0)`,
  },
  saveButton: (theme: Theme) => ({
    background: theme.palette.action.hover,
  }),
  itemButton: (theme: Theme) => ({
    '&.Mui-disabled': {
      border: 'none',
      '& svg': {
        '& path': {
          fill: theme.palette.text.disabled,
        },
      },
    },
  }),
  iconWrapper: {
    display: 'flex',
    padding: '8px',
    mr: '10px',
  },
};
