import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useLoaderData } from "@remix-run/react";

import { ILoaderFunctionResult } from "~/routes/chat";
import Chat2 from '~/components/icons/Chat2';
import theme from "~/mui/theme";

import { styles } from './styles';

type EmptyChatProps = {
  size: number;
  projectName?: string;
};

export const EmptyChat: FC<EmptyChatProps> = ({ projectName, size }) => {
  const { chat } = useLoaderData<ILoaderFunctionResult>();

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
        {chat.description}
      </Typography>
    </Box>
  );
};

export default EmptyChat;
