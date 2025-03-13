import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, useTheme } from "@mui/material";

import ArrowDownward from "~/components/icons/ArrowDownward";
import { ActivityTimeline } from "~/components/common/ActivityTimeline";
import { IconButton } from "~/components/uiKit/IconButton";

import { EmptyChat } from "~/segments/chat/EmptyChat";
import { ChatInputButtons } from "~/segments/chat/ChatInputButtons";
import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";
import { useChatPage } from "~/segments/chat/view/ChatIndexView/useChatPage";
import { MessagesList } from "~/segments/chat/MessagesList";

import { getChatData, getCurrentProject, getGuidanceQuestion } from "~/store/bus/projects/projects.selectors";

import { wsActions } from "~/store/bus/ws/ws.actions";
import { chatActions } from "~/store/bus/chat/chat.actions";
import { projectsActions } from "~/store/bus/projects/projects.actions";
import { modalActions } from "~/store/bus/modal/modal.actions";
import { AppDispatch } from "~/store";

import { styles } from "~/segments/chat/view/ChatIndexView/styles";
import { getSocketOpened } from "~/store/bus/ws/ws.selectors";

export const ChatIndexView: FC = () => {
  const theme = useTheme();
  const isLg = theme.breakpoints.down('lg');
  const { projectName, chatId } = useChatParams();
  const dispatch = useDispatch<AppDispatch>();
  const guidanceQuestion = useSelector(getGuidanceQuestion);
  const [value, setValue] = useState('');
  const [size, setSize] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(0);
  const refInput = useRef<HTMLDivElement>();
  const currentProject = useSelector(getCurrentProject(projectName));
  const socketStatus = useSelector(getSocketOpened);
  const { currentYearId, currentMonthId, id } = useSelector(
    getChatData(chatId),
  );

  useEffect(() => {
    chatId && setCurrentChatId(chatId);
  }, [chatId, projectName]);

  useEffect(() => {
    if (socketStatus === 'open') {
      dispatch(wsActions.joinChat(chatId.toString()));
    }
  }, [chatId, dispatch, socketStatus]);

  useEffect(() => {
    return () => {
      dispatch(chatActions.setConvertedText(null));
    };
  }, []);

  const scrollToBottom = () => {
    const id = document.getElementById('anchor');
    if (id) {
      id.scrollIntoView();
    }
  };

  const { projectsMessages, sendMessage, handleCreateNewChat } = useChatPage(
    value,
    currentChatId,
    setValue,
    projectName,
  );

  useEffect(() => {
    setValue(guidanceQuestion);
    scrollToBottom();
  }, [guidanceQuestion]);

  useEffect(() => {
    dispatch(projectsActions.fillGuidanceQuestion(''));
    setValue('');
  }, [projectName]);

  useEffect(() => {
    refInput.current && setSize(refInput.current?.clientHeight);
  }, [refInput.current?.clientHeight]);

  const handleClick = () => {};

  const handleAction = (chatId: number, name: string) => {
    dispatch(
      modalActions.modal({
        component: 'EditChat',
        title: 'Chat Edit',
        forceClose: true,
        chatId,
        projectName: name,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(projectsActions.fillGuidanceQuestion(''));
    };
  }, []);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.head}>
        <ActivityTimeline
          list={currentProject?.years ?? []}
          title={'Chat History'}
          emptyStateTitle={`You haven't started any chats yet.`}
          handleClick={handleClick}
          currentChatId={id}
          currentMonth={currentMonthId}
          currentYear={currentYearId}
          handleAction={handleAction}
          createNewChat={handleCreateNewChat}
          isCreateChat
        />
      </Box>

      {
        projectsMessages.length
          ? <>
            {visible && (
              <Box
                sx={{
                  bottom: `calc(${size}px + ${isLg ? '26px' : '40px'})`,
                  ...styles.iconButton,
                }}>
                <IconButton onClick={scrollToBottom} color={'default'}>
                  <ArrowDownward fontSize={'small'} />
                </IconButton>
              </Box>
            )}
            <MessagesList
              size={size}
              currentChatId={currentChatId}
              projectsMessages={projectsMessages}
              scrollToBottom={scrollToBottom}
              setVisible={setVisible}
              sendMessage={sendMessage}
              value={value}
              setValue={setValue}
            />
          </>
          : (
            <EmptyChat projectName={projectName} size={size} />
          )
      }

      <Box ref={refInput} width={'100%'}>
        <ChatInputButtons
          currentChatId={currentChatId}
          value={value}
          projectsMessages={projectsMessages}
          setValue={setValue}
          sendMessage={sendMessage}
          scrollToBottom={scrollToBottom}
        />
      </Box>
    </Box>
  )
}