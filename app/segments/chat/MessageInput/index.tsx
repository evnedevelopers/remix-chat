import { FC } from "react";
import { useSelector } from "react-redux";

import { useSnackbar } from "notistack";

import { Box, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

import DeleteOutline from "~/components/icons/DeleteOutline";
import Send from "~/components/icons/Send";
import { LottieAnimation } from "~/components/uiKit/LottieAnimation";
import { Tooltip } from "~/components/uiKit/Tooltip";
import { UpgradeTooltip } from "~/components/uiKit/Tooltip/UpgradeTooltip";
import { IconButton } from "~/components/uiKit/IconButton";

import { useMessageInput } from "~/segments/chat/MessageInput/useMessageInput";
import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";
import { useAudioRecorder } from "~/segments/chat/MessageInput/useAudioRecorder";
import { DotsAnimation } from "~/segments/chat/DotsAnimation";
import { MessageInputFileButton } from "~/segments/chat/MessageInputFileButton";
import { MessageInputAudioButton } from "~/segments/chat/MessageInputAudioButton";

import { getCurrentFile, getIsFileFetching } from "~/store/selectors/projects.selector";
import { getIsChatTyping, getIsProcessing, getIsRecording } from "~/store/selectors/chat.selector";
import { getProfile } from "~/store/selectors/profile.selector";

import { IChatFile } from "~/utils/typedefs";

import { styles } from './styles';

type MessageInputProps = {
  value: string;
  setValue: any;
  handleSendMessage: (
    question: string,
    isFileContext: boolean,
    file?: IChatFile | null,
  ) => void;
  scrollToBottom: () => void;
  currentProjectId?: string;
};

export const MessageInput: FC<MessageInputProps> = ({
  value,
  setValue,
  handleSendMessage,
  scrollToBottom,
}) => {
  const { projectName, chatId } = useChatParams();
  const { file, is_file_context } = useSelector(
    getCurrentFile(chatId, projectName),
  );
  const isTyping = useSelector(getIsChatTyping);
  const isRecording = useSelector(getIsRecording);
  const isProcessing = useSelector(getIsProcessing);
  const isFileFetching = useSelector(getIsFileFetching);
  const profile = useSelector(getProfile);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const { enqueueSnackbar } = useSnackbar();
  const { animation, handleKeyPress, handleChange, isShowAnimation } =
    useMessageInput(setValue, value, handleSendMessage, is_file_context, file);

  const handleClick = () => {
    handleSendMessage(value, is_file_context, file);
  };

  const {
    handleStartRecording,
    handleStopRecording,
    handleResetAndStopRecording,
  } = useAudioRecorder(scrollToBottom);

  const removeAudio = () => {
    handleResetAndStopRecording();
    enqueueSnackbar('The message is deleted', { variant: 'infoSnackbar' });
  };

  return (
    <Box sx={styles.messageInput} className={'step-3'}>
      <Box
        sx={[
          styles.wrapper,
          isRecording && styles.recording,
          isShowAnimation && styles.animated,
        ]}>
        {animation && isShowAnimation ? (
          <LottieAnimation
            animation={animation}
            text={isProcessing ? 'Converting to text' : ''}
          />
        ) : (
          <Box
            width={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            {isRecording && (
              <Box
                display={'flex'}
                alignItems={'center'}
                sx={styles.removeAudio}>
                <IconButton onClick={removeAudio} color={'secondary'}>
                  <DeleteOutline
                    fontSize={'small'}
                    htmlColor={theme.palette.error.main}
                  />
                </IconButton>
                <Typography
                  ml={'10px'}
                  variant={'body1'}
                  color={'text.disabled'}>
                  Recording...
                </Typography>
              </Box>
            )}
            <Box sx={[!isRecording && styles.inputWrapper]}>
              {isRecording ? (
                !isMd && (
                  <Box display={'flex'} alignItems={'center'} mx={'40px'}>
                    <LottieAnimation animation={animation} />
                  </Box>
                )
              ) : (
                <TextField
                  sx={styles.input}
                  multiline
                  inputProps={{
                    'data-testid': 'send-message-message',
                  }}
                  required
                  maxRows={6}
                  minRows={1}
                  fullWidth
                  placeholder={'Type a message...'}
                  value={value}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                />
              )}
            </Box>
            <Box display={'flex'}>
              {value.trim().length ? (
                <Tooltip
                  title={<UpgradeTooltip />}
                  placement={'top'}
                  id={'text'}
                  zIndex={10000}
                  open={!profile?.subscription}>
                  <Box display={'flex'}>
                    <IconButton
                      onClick={handleClick}
                      color={'secondary'}
                      disabled={
                        isFileFetching ||
                        isTyping ||
                        !value.trim().length ||
                        !profile?.subscription
                      }>
                      {isTyping ? (
                        <DotsAnimation />
                      ) : (
                        <Send
                          fontSize={'small'}
                          htmlColor={theme.palette.text.primary}
                        />
                      )}
                    </IconButton>
                  </Box>
                </Tooltip>
              ) : (
                <>
                  <MessageInputFileButton chatId={chatId} file={file} />
                  <MessageInputAudioButton
                    handleStartRecording={handleStartRecording}
                    handleStopRecording={handleStopRecording}
                  />
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};