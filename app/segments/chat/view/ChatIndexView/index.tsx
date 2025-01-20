import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, useTheme } from "@mui/material";

import { EmptyChat } from "~/segments/chat/EmptyChat";
import { ChatInputButtons } from "~/segments/chat/ChatInputButtons";
import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";
import { useChatPage } from "~/segments/chat/view/ChatIndexView/useChatPage";

import { getCurrentProject, getGuidanceQuestion } from "~/store/selectors/projects.selector";
import { projectsSlice } from "~/store/slices/projects.slice";

import { styles } from "~/segments/chat/view/ChatIndexView/styles";
import { useTokensDisclaimer } from "~/hooks/useTokensDisclaimer";
import {IconButton} from "~/components/uiKit/IconButton";
import ArrowDownward from "~/components/icons/ArrowDownward";
import {MessagesList} from "~/segments/chat/MessagesList";

export const ChatIndexView: FC = () => {
  const theme = useTheme();
  const isLg = theme.breakpoints.down('lg');
  const { projectName, chatId } = useChatParams();
  const dispatch = useDispatch();
  const guidanceQuestion = useSelector(getGuidanceQuestion);
  const [value, setValue] = useState('');
  const [size, setSize] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('');
  const refInput = useRef<HTMLDivElement>();
  const currentProject = useSelector(getCurrentProject(projectName));
  const { handle } = useTokensDisclaimer('questions');

  useEffect(() => {
    chatId && setCurrentChatId(chatId);
  }, [chatId, projectName]);

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
    // navigate(`${book.chat}/${currentProject?.name}/${id}`);
  };

  const handleAction = (chatId: string, name: string) => {
    // dispatch(
    //   modalActions.modal({
    //     component: 'EditChat',
    //     title: 'Chat Edit',
    //     forceClose: true,
    //     chatId,
    //     projectName: name,
    //   }),
    // );
  };

  useEffect(() => {
    return () => {
      dispatch(projectsSlice.actions.fillGuidanceQuestion(''));
    };
  }, []);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.head}>
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
          setValue={setValue}
          projectsMessages={projectsMessages}
          sendMessage={sendMessage}
          scrollToBottom={scrollToBottom}
        />
      </Box>
    </Box>
  )
}