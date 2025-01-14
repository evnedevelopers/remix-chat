import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import Lottie from 'lottie-react';

import { styles } from './styles';

type LottieAnimationProps = {
  animation: unknown;
  text?: string;
};

export const LottieAnimation: FC<LottieAnimationProps> = ({
  animation,
  text,
}) => {
  return (
    <Box sx={[styles.lottieAnimation, !!text && styles.withText]}>
      {text && <Typography variant={'subtitle2'}>{text}</Typography>}
      <Lottie animationData={animation} loop={true} />
    </Box>
  );
};

export default LottieAnimation;
