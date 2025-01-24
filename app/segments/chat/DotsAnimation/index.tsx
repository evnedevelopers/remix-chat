import { styles } from './styles';

import { Box, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';

type DotsAnimationProps = {};

export const DotsAnimation: FC<DotsAnimationProps> = () => {
  const theme = useTheme();

  const typing = keyframes`
  0% {
        background-color: ${theme.palette.text.primary};
        box-shadow: 8px 0 0 0 rgba(255,255,255,0.2), 16px 0 0 0 rgba(255,255,255,0.2);
      }
  25% {
         background-color: ${theme.palette.text.secondary};
         box-shadow: 8px 0 0 0 ${theme.palette.text.secondary}, 16px 0 0 0 rgba(255,255,255,0.2);
       }
  75% {
         background-color: ${theme.palette.text.disabled};
         box-shadow: 8px 0 0 0 rgba(255,255,255,0.2), 16px 0 0 0 ${theme.palette.text.disabled};
       }
`;

  return (
    <Box sx={styles.dotsAnimation}>
      <Box
        sx={{
          ...styles.typingLoader,
          animation: `${typing} 1s linear infinite alternate`,
        }}
      />
    </Box>
  );
};