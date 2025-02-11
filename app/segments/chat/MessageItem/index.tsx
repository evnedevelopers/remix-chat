import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import parse from 'html-react-parser';

import { Box, Button, Typography, useTheme } from "@mui/material";

import { MessageImagesList } from "~/components/common/MessageImagesList";

import { SuggestingQuestions } from "~/segments/chat/SuggestingQuestions";
import { MessageTimeBadge } from "~/segments/chat/MessageTimeBadge";
import { MessageItemHeader } from "~/segments/chat/MessageItemHeader";
import { MessageItemButtons } from "~/segments/chat/MessageItemButtons";
import { CarriageAnimation } from "~/segments/chat/CarriageAnimation";
import { MessageItemFile } from "~/segments/chat/MessageItemFile";

import { getIsSameDay } from "~/helpers/getDateTime";

import { useLimits } from "~/hooks/useLimits";
import { useTokensDisclaimer } from "~/hooks/useTokensDisclaimer";

import { IMessage } from "~/utils/typedefs";

import {
  getCanDoAction,
  getShowBuyTokensModal,
  getShowUpdatePlanToUseTokensModal
} from "~/store/selectors/profile.selector";
import { getIsChatTyping } from "~/store/selectors/chat.selector";
import { getIsGlobalSpeaking } from "~/store/selectors/ui.selector";
import { chatSlice } from "~/store/slices/chat.slice";
import { projectsSlice } from "~/store/slices/projects.slice";
import { wsActions } from "~/store/saga/ws/actions";

import { styles } from './styles';

type MessageItemProps = {
  isHuman: boolean;
  nextDate?: string;
  isTypingMessage: boolean;
  isMockHuman: boolean;
  id: string;
  chatId: string | null;
  lastHumanMessage: string;
  projectId: string;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioPlayingId: string | number;
  setAudioPlayingId: (isPlaying: string) => void;
  audioLoadingId: number | string;
  setAudioLoadingId: (isPlaying: string) => void;
  messageItem: IMessage;
  sendMessage: any;
  value: string;
  setValue: any;
};


export const MessageItem: FC<MessageItemProps> = ({
  isHuman,
  nextDate,
  isTypingMessage,
  id,
  chatId,
  projectId,
  isMockHuman,
  setIsPlaying,
  isPlaying,
  audioPlayingId,
  setAudioPlayingId,
  audioLoadingId,
  setAudioLoadingId,
  messageItem,
  sendMessage,
  lastHumanMessage
}) => {
  const theme = useTheme();
  const isTyping = useSelector(getIsChatTyping);
  const dispatch = useDispatch();
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const globalSpeaking = useSelector(getIsGlobalSpeaking);
  const canDoAction = useSelector(getCanDoAction);
  const showBuyTokensModal = useSelector(getShowBuyTokensModal);
  const showUpdatePlanToUseTokensModal = useSelector(
    getShowUpdatePlanToUseTokensModal,
  );

  const { handleLimitExceeded } = useLimits(
    showUpdatePlanToUseTokensModal,
    showBuyTokensModal,
  );

  const { handle } = useTokensDisclaimer('questions');

  const timeBadge = !getIsSameDay(messageItem.created_at, nextDate);

  const handleResendRequest = () => {
    dispatch(chatSlice.actions.setMessageId(id));
    dispatch(projectsSlice.actions.updateErrorMessage({ id, chatId: chatId || undefined }));
    dispatch(
      wsActions.sendMessageRequest({
        values: {
          action: 'request',
          app: 'chat',
          event: 'message',
          data: {
            query: lastHumanMessage,
            project_id: projectId,
            continue: null,
            chat_id: chatId,
            dataset_matching: true,
          },
        },
      }),
    );
  };

  const handleContinueRequest = () => {
    handle();

    if (!canDoAction) {
      handleLimitExceeded();

      return;
    }

    dispatch(
      wsActions.sendMessageRequest({
        values: {
          action: 'request',
          app: 'chat',
          event: 'message_continue',
          data: {
            project_id: messageItem.project?.id,
            chat_id: chatId,
            message_id: id,
            last_token_index: messageItem.tokenIndex,
          },
        },
      }),
    );
  };

  useEffect(() => {
    setIsPlaying(false);
  }, [location]);

  useEffect(() => {
    if (
      isPlaying &&
      messageItem.audio &&
      audioPlayingId === id &&
      audioElementRef.current
    ) {
      audioElementRef.current
        .play()
        .then(() => {
          dispatch(chatSlice.actions.startAudioPlaying());
        })
        .catch(() => {
          dispatch(chatSlice.actions.stopAudioPlaying());
        });
    }
    if (!isPlaying && audioElementRef.current) {
      audioElementRef.current.pause();
      dispatch(chatSlice.actions.stopAudioPlaying());
    }
  }, [messageItem.audio, audioPlayingId, id, isPlaying]);

  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPlaying(false);
      setAudioPlayingId('');
      dispatch(chatSlice.actions.setGlobalMessageId(null));
      dispatch(chatSlice.actions.stopAudioPlaying());
      globalSpeaking && dispatch(chatSlice.actions.startVoiceDetected());
    };

    if (audioElementRef.current) {
      audioElementRef.current.addEventListener('ended', handleAudioEnded);
    }

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [audioElementRef.current]);

  function fixUnclosedTags(html: string) {
    return html.replace(/<br\|/g, '<br>').replace(/<b\|/g, '<b>');
  }

  return (
    <>
      <Box id={id + ''} />
      <Box display={'flex'} sx={[isHuman && styles.human]}>
        <Box sx={[styles.messageItem, !isHuman ? styles.messageItemAi : {}]}>
          <MessageItemHeader
            isTypingMessage={isTypingMessage}
            chatId={chatId}
            rate={messageItem.message_rate}
            id={id}
            message={messageItem.text}
            isHuman={isHuman}
            saved={messageItem.saved_at}
            isMockHuman={isMockHuman}
            messageItem={messageItem}
            projectId={projectId}
          />
          {!!messageItem.files.length && !messageItem.files[0].error && (
            <MessageItemFile file={messageItem.files[0]} />
          )}
          <Box
            mt={'8px'}
            minWidth={'90px'}
            sx={[isHuman && styles.messageItemHuman]}>
            <Box sx={[isHuman && styles.messageHuman]}>
              <Typography
                variant={'body3'}
                lineHeight={'20px'}
                color={
                  messageItem.type === 'error'
                    ? theme.palette.error.main
                    : theme.palette.text.primary
                }>
                {parse(fixUnclosedTags(messageItem.text || ''))}{' '}
                {isTypingMessage && isTyping && <CarriageAnimation />}
              </Typography>
            </Box>
            {!isHuman && messageItem.suggestingQuestions && (
              <SuggestingQuestions
                questions={messageItem.suggestingQuestions}
                handleSendMessage={sendMessage}
              />
            )}
            {messageItem.audio && (
              <audio
                ref={audioElementRef}
                src={messageItem.audio}
                preload="auto"
                style={{ display: 'none' }}>
                <track kind={'captions'} />
              </audio>
            )}
            <MessageItemButtons
              ref={buttonRef}
              messageItem={messageItem}
              isHuman={isHuman}
              isTypingMessage={isTypingMessage}
              isActiveAudio={audioPlayingId === id}
              isPlaying={isPlaying}
              setAudioLoadingId={setAudioLoadingId}
              setAudioPlayingId={setAudioPlayingId}
              setIsPlaying={setIsPlaying}
              isLoading={audioLoadingId === id}
              projectId={projectId}
              chatId={chatId}
            />
            {messageItem.continueStatus && !messageItem.nextToken && (
              <Button
                variant={'secondary'}
                sx={styles.button}
                disabled={isTyping}
                onClick={handleContinueRequest}>
                <Typography variant={'button'} color={'text.primary'}>
                  Continue answering
                </Typography>
              </Button>
            )}
            {messageItem.type === 'error' && !!messageItem.text && (
              <Box alignSelf={'center'}>
                <Button
                  variant={'primary'}
                  disabled={isTyping}
                  sx={{ maxWidth: '163px', mt: '20px' }}
                  onClick={handleResendRequest}>
                  <Typography variant={'button'}>Resend Request</Typography>
                </Button>
              </Box>
            )}
            {messageItem.images && messageItem.images.length > 0 && (
              <Box mt={'20px'}>
                <MessageImagesList images={messageItem.images} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {timeBadge && (
        <Box
          sx={{
            transform: 'rotate(180deg)',
            direction: 'ltr',
            width: '100%!important',
            maxWidth: 'unset!important',
          }}>
          <MessageTimeBadge date={messageItem.created_at} />
        </Box>
      )}
    </>
  );
};