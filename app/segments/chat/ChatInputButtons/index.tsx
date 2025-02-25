import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

import { MessageInput } from "~/segments/chat/MessageInput";
import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";
import { CreateChatButton } from "~/segments/chat/CreateChatButton";
import { Guidance } from "~/segments/home/Guidance";
import { ChatInputFile } from "~/segments/chat/ChatInputFile";
import { SendMessageFunction } from "~/segments/chat/view/ChatIndexView/useChatPage";

import { getCurrentFile, getCurrentProject, getIsWaiting, getWaitingProject } from "~/store/bus/projects/projects.selectors";
import { getCurrentDataset } from "~/store/bus/profile/profile.selectors";
import { IMessage } from "~/store/bus/chat/typedefs";

type ChatInputButtonsProps = {
  currentChatId: number;
  value: string;
  projectsMessages: IMessage[];
  setValue: Dispatch<SetStateAction<string>>;
  sendMessage: SendMessageFunction;
  scrollToBottom: () => void;
};

export const ChatInputButtons: FC<ChatInputButtonsProps> = ({
  currentChatId,
  value,
  projectsMessages,
  setValue,
  sendMessage,
  scrollToBottom,
}) => {
  const { projectName, chatId } = useChatParams();
  const { file, isFileContext } = useSelector(
    getCurrentFile(chatId, projectName),
  );
  const isWaiting = useSelector(getIsWaiting(chatId));
  const currentProject = useSelector(getCurrentProject(projectName));
  const waitingProject = useSelector(getWaitingProject(chatId));
  const currentDataset = useSelector(getCurrentDataset);

  const [animateOut, setAnimateOut] = useState(false);
  const [showCreateChatButton, setShowCreateChatButton] = useState(isWaiting);

  const [prevChatId, setPrevChatId] = useState(chatId);

  useEffect(() => {
    if (chatId !== prevChatId) {
      setAnimateOut(false);
      setShowCreateChatButton(false);
    }
  }, [chatId, prevChatId]);

  useEffect(() => {
    setPrevChatId(chatId);
  }, [chatId]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isWaiting) {
      setAnimateOut(true);
      timer = setTimeout(() => {
        setShowCreateChatButton(true);
        setAnimateOut(false);
      }, 300);
    } else {
      setShowCreateChatButton(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isWaiting, projectName, chatId]);

  const slideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`;

  const slideDown = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
`;

  return (
    <>
      {showCreateChatButton && isWaiting && currentProject ? (
        <Box
          sx={{
            position: 'relative',
            animation: `${slideUp} 0.3s ease forwards`,
          }}>
          <CreateChatButton
            matchingProject={
              waitingProject?.chats.find((chat) => chat.id === currentChatId)
                ?.messages?.results[0]?.project as IMessage['project']
            }
            value={value}
            projectsMessages={projectsMessages}
            currentChatId={currentChatId}
            currentProjectId={currentProject?.id ?? 0}
            setValue={setValue}
          />
        </Box>
      ) : null}

      {!showCreateChatButton && (
        <Box
          sx={{
            position: 'relative',
            ...(animateOut
              ? { animation: `${slideDown} 0.3s ease forwards` }
              : {}),
          }}>
          {file?.id && !isFileContext && <ChatInputFile />}
          <Guidance currentProject={currentDataset} isChatPage />
          <MessageInput
            value={value}
            setValue={setValue}
            handleSendMessage={sendMessage}
            scrollToBottom={scrollToBottom}
            currentProjectId={currentProject?.id}
          />
        </Box>
      )}
    </>
  );
};
