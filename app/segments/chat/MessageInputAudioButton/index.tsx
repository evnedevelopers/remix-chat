import { FC } from "react";
import { useSelector } from "react-redux";

import { Box, useTheme } from "@mui/material";

import MicNone from "~/components/icons/MicNone";
import { UpgradeTooltip } from "~/components/uiKit/Tooltip/UpgradeTooltip";
import { IconButton } from "~/components/uiKit/IconButton";
import { Tooltip } from "~/components/uiKit/Tooltip";

import { DotsAnimation } from "~/segments/chat/DotsAnimation";
import { StopRecordingButton } from "~/segments/chat/StopRecordingButton";

import { getIsShowAudioButtons, getProfile } from "~/store/selectors/profile.selectors";
import { getIsChatTyping, getIsRecording } from "~/store/selectors/chat.selectors";

type MessageInputAudioButtonProps = {
  handleStartRecording: () => void;
  handleStopRecording: () => Promise<any>;
};

export const MessageInputAudioButton: FC<MessageInputAudioButtonProps> = ({
  handleStartRecording,
  handleStopRecording,
}) => {
  const isShowButtons = useSelector(getIsShowAudioButtons);
  const isTyping = useSelector(getIsChatTyping);
  const isRecording = useSelector(getIsRecording);
  const profile = useSelector(getProfile);
  const theme = useTheme();

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
          open={isShowButtons || !profile?.subscription}>
          <Box display={'flex'}>
            <IconButton
              onClick={recording}
              color={'secondary'}
              disabled={isShowButtons || isTyping || !profile?.subscription}>
              {isTyping ? (
                <DotsAnimation />
              ) : (
                <MicNone
                  fontSize={'small'}
                  htmlColor={theme.palette.text.primary}
                />
              )}
            </IconButton>
          </Box>
        </Tooltip>
      )}
    </>
  );
};