import { FC } from "react";
import { useSelector } from "react-redux";

import { Box, useTheme } from "@mui/material";

import MicNone from "~/components/icons/MicNone";
import { UpgradeTooltip } from "~/components/uiKit/Tooltip/UpgradeTooltip";
import { IconButton } from "~/components/uiKit/IconButton";
import { Tooltip } from "~/components/uiKit/Tooltip";

import { StopRecordingButton } from "~/segments/chat/StopRecordingButton";

import { getIsRecording } from "~/store/bus/chat/chat.selectors";

type MessageInputAudioButtonProps = {
  handleStartRecording: () => void;
  handleStopRecording: () => Promise<void>;
};

export const MessageInputAudioButton: FC<MessageInputAudioButtonProps> = ({
  handleStartRecording,
  handleStopRecording,
}) => {
  const theme = useTheme();

  const isRecording = useSelector(getIsRecording);

  const recording = () => {
    handleStartRecording();
  };

  return (
    <>
      {isRecording ? (
        <StopRecordingButton handleStopRecording={handleStopRecording} />
      ) : (
        <Tooltip
          title={<UpgradeTooltip />}
          placement={'top'}
          id={'input'}
          zIndex={10000}
        >
          <Box display={'flex'}>
            <IconButton
              onClick={recording}
              color={'secondary'}
              >
              <MicNone
                fontSize={'small'}
                htmlColor={theme.palette.text.primary}
              />
            </IconButton>
          </Box>
        </Tooltip>
      )}
    </>
  );
};