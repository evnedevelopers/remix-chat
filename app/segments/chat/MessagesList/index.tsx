import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";
import { Messenger } from "~/segments/chat/Messenger";

import { getNewestMessageId, getOldestMessageId, getProjectId } from "~/store/selectors/projects.selectors";
import { getScrollToMessageId } from "~/store/selectors/saved-messages.selectors";
import { savedMessagesActions } from "~/store/actions/saved-messages.actions";
import { settingsActions } from "~/store/actions/settings.actions";
import { chatActions } from "~/store/actions/chat.actions";
import { getIsAiConversationFetching } from "~/store/selectors/ai-conversation.selectors";
import { AppDispatch } from "~/store";

import { IMessage } from "~/utils/typedefs";

import { styles } from './styles';

type MessagesListProps = {
  size: number;
  currentChatId: string;
  projectsMessages: IMessage[];
  scrollToBottom: () => void;
  setVisible: (value: boolean) => void;
  sendMessage: any;
  value: string;
  setValue: any;
};

export const MessagesList: FC<MessagesListProps> = ({
  size,
  currentChatId,
  projectsMessages,
  scrollToBottom,
  setVisible,
  sendMessage,
  setValue,
  value,
}) => {
  const { chatId, projectName } = useChatParams();
  const ref = useRef<HTMLDivElement>();
  const oldestId = useSelector(getOldestMessageId(chatId, projectName));
  const newestId = useSelector(getNewestMessageId(chatId, projectName));
  const mainProjectId = useSelector(getProjectId(projectName));
  const dispatch = useDispatch<AppDispatch>();
  const isFetching = useSelector(getIsAiConversationFetching);
  const [totalScrollHeight, setTotalScrollHeight] = useState(0);
  const scrollToMessageId = useSelector(getScrollToMessageId);
  const [audioLoadingId, setAudioLoadingId] = useState<string>('');

  useEffect(() => {
    if (projectsMessages.length) {
      if (ref.current) {
        const { scrollTop, scrollHeight } = ref.current;
        setTotalScrollHeight(scrollHeight);
        if (scrollTop < 80) {
          scrollToBottom();
        }
      }
    }
  }, [projectsMessages]);

  useEffect(() => {
    if (scrollToMessageId) {
      const element = document.getElementById(`${scrollToMessageId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          dispatch(savedMessagesActions.clearMessageId());
        }, 100);
      }
    }
  }, [scrollToMessageId]);

  const handleScrolls = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    const bottom =
      Math.floor(clientHeight) >= Math.floor(scrollHeight - scrollTop);
    if (bottom) {
      dispatch(settingsActions.fetchSettings());
      !isFetching &&
      chatId &&
      typeof oldestId === 'string' &&
      dispatch(
        chatActions.loadMoreMessages({
          payload: {
            url: `/chats/${chatId}/messages?lt_id=${oldestId}`,
            chatId,
            isNext: true,
            isPrev: false
          }
        }),
      );
      return;
    }
    if (scrollTop === 0) {
      if (chatId && typeof newestId === 'string') {
        return new Promise((resolve) => {
          dispatch(
            chatActions.loadPrevMessages({
              payload: {
                url: `/chats/${chatId}/messages?mt_id=${newestId}`,
                chatId,
              },
              meta: { resolve },
            }),
          );
        })
          .then(() => {
            ref.current?.scrollTo({
              top: ref.current?.scrollHeight - totalScrollHeight,
            });
          })
          .catch((error) => {
            return error;
          });
      }
    }
    if (Math.floor(e.target.scrollTop) > 300) {
      setVisible(true);

      return;
    }
    setVisible(false);
  };

  useEffect(() => {
    const handleWheel = (event: any) => {
      if (ref.current) {
        event.preventDefault();
        ref.current.scrollTop -= event.deltaY;
      }
    };

    if (ref.current) {
      const scrollContainer = ref.current;
      scrollContainer.addEventListener('wheel', handleWheel);

      return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
      };
    }
  }, [ref.current]);

  return (
    <Box
      sx={(theme) => styles.messagesList(theme, size)}
      ref={ref}
      onScroll={(e) => handleScrolls(e)}>
      <Box id={'anchor'} />
      <Box sx={styles.list}>
        <Messenger
          messages={projectsMessages}
          chatId={currentChatId}
          audioLoadingId={audioLoadingId}
          setAudioLoadingId={setAudioLoadingId}
          mainProjectId={mainProjectId}
          sendMessage={sendMessage}
          value={value}
          setValue={setValue}
        />
      </Box>
    </Box>
  );
};