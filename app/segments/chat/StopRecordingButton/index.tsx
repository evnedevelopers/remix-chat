import { FC } from "react";
import { useSelector } from "react-redux";

import { Box, Typography, useTheme } from "@mui/material";

import Stop from "~/components/icons/Stop";

import { useAllTimer } from "~/hooks/useAllTimer";

import { getAllowCountdown } from "~/store/selectors/chat.selector";
import { getAudioTimer } from "~/store/selectors/settings.selector";
import { chatSlice } from "~/store/slices/chat.slice";

import { styles } from './styles';

type StopRecordingButtonProps = {
  handleStopRecording: () => Promise<any>;
};

export const StopRecordingButton: FC<StopRecordingButtonProps> = ({
  handleStopRecording,
}) => {
  const theme = useTheme();
  const allowCountdown = useSelector(getAllowCountdown);
  const audioTimer = useSelector(getAudioTimer);

  const { timer } = useAllTimer(
    allowCountdown,
    audioTimer,
    chatSlice.actions.allowCountdown,
  );

  const stopRecording = () => {
    handleStopRecording().then().catch();
  };

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'} width={'40px'} mr={'10px'}>
        <Typography variant={'body1'} color={'text.primary'} mr={'4px'}>
          {timer}
        </Typography>
        <Typography variant={'body1'} color={'text.disabled'}>
          s
        </Typography>
      </Box>
      <Box sx={styles.stopButton} onClick={stopRecording}>
        <Stop
          fontSize={'small'}
          htmlColor={theme.palette.primary.contrastText}
        />
      </Box>
    </Box>
  );
};