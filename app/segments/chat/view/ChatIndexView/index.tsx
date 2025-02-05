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

import { useTokensDisclaimer } from "~/hooks/useTokensDisclaimer";

import { getChatData, getCurrentProject, getGuidanceQuestion } from "~/store/selectors/projects.selector";
import { projectsSlice } from "~/store/slices/projects.slice";
import { modalSlice } from "~/store/slices/modal.slice";
import { chatSlice } from "~/store/slices/chat.slice";
import { wsActions } from "~/store/saga/ws/actions";

import { styles } from "~/segments/chat/view/ChatIndexView/styles";
import { AppDispatch } from "~/store";

export const ChatIndexView: FC = () => {
  const theme = useTheme();
  const isLg = theme.breakpoints.down('lg');
  const { projectName, chatId } = useChatParams();
  const dispatch = useDispatch<AppDispatch>();
  const guidanceQuestion = useSelector(getGuidanceQuestion);
  const [value, setValue] = useState('');
  const [size, setSize] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('');
  const refInput = useRef<HTMLDivElement>();
  const currentProject = useSelector(getCurrentProject(projectName));
  const { currentYearId, currentMonthId, id } = useSelector(
    getChatData(chatId),
  );
  const { handle } = useTokensDisclaimer('questions');

  useEffect(() => {
    chatId && setCurrentChatId(chatId);
  }, [chatId, projectName]);

  useEffect(() => {
    dispatch(wsActions.joinChat(chatId));
  }, [chatId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(chatSlice.actions.setConvertedText(null));
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
    handle,
    projectName,
  );

  useEffect(() => {
    setValue(guidanceQuestion);
    scrollToBottom();
  }, [guidanceQuestion]);

  useEffect(() => {
    dispatch(projectsSlice.actions.fillGuidanceQuestion(''));
    setValue('');
  }, [projectName]);

  useEffect(() => {
    refInput.current && setSize(refInput.current?.clientHeight);
  }, [refInput.current?.clientHeight]);

  const handleClick = (id: string) => {
    alert('handleClick: ' + id);
  };

  const handleAction = (chatId: string, name: string) => {
    dispatch(
      modalSlice.actions.modal({
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
      dispatch(projectsSlice.actions.fillGuidanceQuestion(''));
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