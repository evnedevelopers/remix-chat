import { forwardRef } from "react";
import { useSelector } from "react-redux";

import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";


import { useMessageItemButtons } from "~/segments/chat/MessageItemButtons/useMessageItemButtons";

import VolumeUp from "~/components/icons/VolumeUp";
import Imagine from "~/components/icons/Imagine";
import Gallery from "~/components/icons/Gallery";
import { IconButton } from "~/components/uiKit/IconButton";
import { Tooltip } from "~/components/uiKit/Tooltip";
import { UpgradeTooltip } from "~/components/uiKit/Tooltip/UpgradeTooltip";

import { getIsShowAudioButtons, getProfile } from "~/store/selectors/profile.selector";
import { getIsProjectsAudioFetching } from "~/store/selectors/projects.selector";
import { getIsImageLoading } from "~/store/selectors/chat.selector";

import { IMessage } from "~/utils/typedefs";

import { styles } from './styles';

type MessageItemButtonsProps = {
  messageItem: IMessage;
  isHuman: boolean;
  isTypingMessage: boolean;
  isActiveAudio: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  setAudioLoadingId: (i: string) => void;
  setAudioPlayingId: (i: string) => void;
  setIsPlaying: (i: boolean) => void;
  projectId: string;
  chatId: string | null;
};

export const MessageItemButtons = forwardRef<
  HTMLButtonElement,
  MessageItemButtonsProps
>(
  (
    {
      messageItem,
      isHuman,
      isTypingMessage,
      isActiveAudio,
      isPlaying,
      setAudioLoadingId,
      setAudioPlayingId,
      setIsPlaying,
      isLoading,
      projectId,
      chatId,
    },
    ref,
  ) => {
    const theme = useTheme();
    const isShowButtons = useSelector(getIsShowAudioButtons);
    const isAudioFetching = useSelector(getIsProjectsAudioFetching);
    const profile = useSelector(getProfile);
    const isImageLoading = useSelector(getIsImageLoading);

    const { handleNavigate, handleVisualizeRequest, handleGetAudio } =
      useMessageItemButtons(
        messageItem,
        isPlaying,
        setAudioLoadingId,
        setAudioPlayingId,
        setIsPlaying,
        projectId,
        chatId,
      );

    const isHavePlaceholders = messageItem.images.some((image) => {
      return !image.image && !image.error && !image.deleted_at;
    });

    return (
      <Box sx={styles.messageItemButtons}>
        <Box display={'flex'} alignItems={'center'} gap={'10px'}>
          {!isHuman && messageItem.type !== 'error' && !isTypingMessage && (
            <Tooltip
              title={<UpgradeTooltip />}
              placement={'right'}
              id={`${messageItem.id}audio`}
              zIndex={10000}
              open={isShowButtons}>
              <Box display={'flex'}>
                <IconButton
                  ref={ref}
                  sx={[isActiveAudio && styles.playing]}
                  disabled={
                    isShowButtons ||
                    isAudioFetching ||
                    (isPlaying && !isActiveAudio)
                  }
                  color={'inherit'}
                  onClick={handleGetAudio}>
                  {isAudioFetching && isLoading ? (
                    <CircularProgress
                      sx={styles.progress}
                      thickness={2}
                      size={24}
                    />
                  ) : (
                    <VolumeUp
                      fontSize={'small'}
                      htmlColor={theme.palette.text.secondary}
                    />
                  )}
                </IconButton>
              </Box>
            </Tooltip>
          )}
          {!isHuman && messageItem.type !== 'error' && !isTypingMessage && (
            <Tooltip
              title={<UpgradeTooltip />}
              placement={'right'}
              id={`${messageItem.id}visualize`}
              zIndex={10000}
              open={!profile?.subscription}>
              <Box display={'flex'}>
                <Button
                  sx={styles.imageButton}
                  onClick={handleVisualizeRequest}
                  variant={'secondary'}
                  disabled={
                    isImageLoading ||
                    isHavePlaceholders ||
                    !profile?.subscription
                  }
                  startIcon={
                    <Imagine
                      fontSize={'small'}
                      htmlColor={theme.palette.text.secondary}
                    />
                  }></Button>
              </Box>
            </Tooltip>
          )}
        </Box>
        {messageItem.images && messageItem.images.length > 0 && (
          <Button
            variant={'secondary'}
            onClick={handleNavigate}
            endIcon={
              <Gallery
                fontSize={'small'}
                htmlColor={theme.palette.text.primary}
              />
            }>
            <Typography variant={'button'} color={'text.primary'}>
              Open my Gallery
            </Typography>
          </Button>
        )}
      </Box>
    );
  },
);

MessageItemButtons.displayName = 'MessageItemButtons';