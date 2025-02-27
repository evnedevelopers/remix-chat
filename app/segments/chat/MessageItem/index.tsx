import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import parse from 'html-react-parser';

import { Box, Button, Typography, useTheme } from "@mui/material";

import { MessageImagesList } from "~/components/common/MessageImagesList";

import { SuggestingQuestions } from "~/segments/chat/SuggestingQuestions";
import { MessageTimeBadge } from "~/segments/chat/MessageTimeBadge";
import { MessageItemHeader } from "~/segments/chat/MessageItemHeader";
import { MessageItemButtons } from "~/segments/chat/MessageItemButtons";
import { MessageItemFile } from "~/segments/chat/MessageItemFile";
import { SendMessageFunction } from "~/segments/chat/view/ChatIndexView/useChatPage";
import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";

import { getIsSameDay } from "~/helpers/getDateTime";

import { getIsGlobalSpeaking } from "~/store/bus/ui/ui.selectors";
import { chatActions } from "~/store/bus/chat/chat.actions";
import { projectsActions } from "~/store/bus/projects/projects.actions";
import { wsActions } from "~/store/bus/ws/ws.actions";
import { IMessage } from "~/store/bus/chat/typedefs";
import { getProfile } from "~/store/bus/profile/profile.selectors";
import { AppDispatch } from "~/store";

import { styles } from './styles';

type MessageItemProps = {
  isICreator: boolean;
  nextDate?: string;
  isMockHuman: boolean;
  id: number;
  chatId: number | null;
  lastHumanMessage: string;
  projectId: number;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioPlayingId: string | number;
  setAudioPlayingId: (isPlaying: number) => void;
  audioLoadingId: number | string;
  setAudioLoadingId: (isPlaying: number) => void;
  messageItem: IMessage;
  sendMessage: SendMessageFunction;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const MessageItem: FC<MessageItemProps> = ({
  isICreator,
  nextDate,
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
  const { projectName } = useChatParams();

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const globalSpeaking = useSelector(getIsGlobalSpeaking);
  const profile = useSelector(getProfile);

  const timeBadge = !getIsSameDay(messageItem.createdAt, nextDate);

  const handleResendRequest = () => {
    dispatch(projectsActions.updateErrorMessage({ id, chatId: chatId || undefined }));
    dispatch(
      wsActions.sendMessageRequest({
        payload: {
          action: 'request',
          app: 'chat',
          event: 'message',
          data: {
            query: lastHumanMessage,
            projectId: projectId,
            continue: null,
            authorId: profile!.id,
            chatId: chatId,
            projectName,
            datasetMatching: true,
          },
        },
        meta: {}
      }),
    );
  };

  const handleContinueRequest = () => {
    dispatch(
      wsActions.sendMessageRequest({
        payload: {
          action: 'request',
          app: 'chat',
          event: 'message_continue',
          data: {
            projectId: messageItem.project?.id,
            chatId: chatId,
            messageId: id,
            lastTokenIndex: messageItem.tokenIndex,
          },
        },
        meta: {}
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
          dispatch(chatActions.startAudioPlaying());
        })
        .catch(() => {
          dispatch(chatActions.stopAudioPlaying());
        });
    }
    if (!isPlaying && audioElementRef.current) {
      audioElementRef.current.pause();
      dispatch(chatActions.stopAudioPlaying());
    }
  }, [messageItem.audio, audioPlayingId, id, isPlaying]);

  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPlaying(false);
      setAudioPlayingId(0);
      dispatch(chatActions.setGlobalMessageId(null));
      dispatch(chatActions.stopAudioPlaying());
      globalSpeaking && dispatch(chatActions.startVoiceDetected());
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
      <Box display={'flex'} sx={[isICreator && styles.human]}>
        <Box sx={[styles.messageItem, !isICreator ? styles.messageItemAi : {}]}>
          <MessageItemHeader
            chatId={chatId}
            rate={messageItem.messageRate}
            id={id}
            message={messageItem.text}
            isICreator={isICreator}
            saved={messageItem.savedAt}
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
            sx={[isICreator && styles.messageItemHuman]}>
            <Box sx={[isICreator && styles.messageHuman]}>
              <Typography
                variant={'body3'}
                lineHeight={'20px'}
                color={
                  messageItem.type === 'error'
                    ? theme.palette.error.main
                    : theme.palette.text.primary
                }>
                {parse(fixUnclosedTags(messageItem.text || ''))}{' '}
              </Typography>
            </Box>
            {!isICreator && messageItem.suggestingQuestions && (
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
              isICreator={isICreator}
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
          <MessageTimeBadge date={messageItem.createdAt} />
        </Box>
      )}
    </>
  );
};