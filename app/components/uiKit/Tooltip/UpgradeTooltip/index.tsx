import { FC } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { styles } from './styles';

type UpgradeTooltipProps = {
  text?: string;
  isButton?: boolean;
};

export const UpgradeTooltip: FC<UpgradeTooltipProps> = ({
  text = 'Update plan to access',
  isButton = true,
}) => {
  const handleClick = () => {

  };

  return (
    <Box sx={styles.upgradeTooltip}>
      <Typography variant={'subtitle1'} color={'text.primary'}>
        {text}
      </Typography>
      {isButton && (
        <Button
          fullWidth
          onClick={handleClick}
          sx={{ mt: '10px' }}
          variant={'primary'}>
          <Typography variant={'button'} color={'primary.contrastText'}>
            Go to account
          </Typography>
        </Button>
      )}
    </Box>
  );
};
