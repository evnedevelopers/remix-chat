import { FC } from "react";

import { Box, useTheme } from "@mui/material";
import { keyframes } from '@emotion/react';

import { styles } from './styles';

type CarriageAnimationProps = {};

export const CarriageAnimation: FC<CarriageAnimationProps> = () => {
  const theme = useTheme();
  const color = theme.palette.text.primary;
  const typing = keyframes`
  from {
        background-color: ${color};
        opacity: 1;
      }
  to {
        opacity: 0;
       }
`;

  return (
    <Box sx={styles.carrageAnimation} component={'span'}>
      <Box
        component={'span'}
        sx={{
          ...styles.typingLoader,
          animation: `${typing} 0.3s linear infinite alternate`,
        }}
      />
    </Box>
  );
};