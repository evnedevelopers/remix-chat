import { FC } from 'react';
import { useSelector } from "react-redux";

import { Box, Typography, useTheme } from '@mui/material';

import Chat2 from '~/components/icons/Chat2';

import { getCurrentDescription } from "~/store/selectors/projects.selectors";

import { styles } from './styles';

type EmptyChatProps = {
  size: number;
  projectName?: string;
};

export const EmptyChat: FC<EmptyChatProps> = ({ projectName, size }) => {
  const theme = useTheme();
  const description = useSelector(getCurrentDescription(projectName));

  return (
    <Box sx={(theme) => styles.emptyChat(theme, size)}>
      <Chat2
        sx={{ fontSize: '44px' }}
        htmlColor={theme.palette.common.surface.contrast}
      />
      <Typography variant={'h4'} my={'20px'}>
        {projectName}
      </Typography>
      <Typography
        variant={'body1'}
        mb={'40px'}
        maxWidth={'580px'}
        textAlign={'center'}
      >
        {description}
      </Typography>
    </Box>
  );
};
