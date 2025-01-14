import { FC, useState } from 'react';

import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { MessageInput } from "~/segments/chat/MessageInput";
import { useSelector } from "react-redux";
import { getCurrentProject } from "~/store/selectors/projects.selector";
import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";

type ChatInputButtonsProps = {
  currentChatId: string;
  value: string;
  // eslint-disable-next-line
  projectsMessages: any;
  // eslint-disable-next-line
  setValue: any;
  // eslint-disable-next-line
  sendMessage: any;
  // eslint-disable-next-line
  scrollToBottom: any;
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
  const currentProject = useSelector(getCurrentProject(projectName));

  const [animateOut] = useState(false);

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
      <Box
        sx={{
          position: 'relative',
          ...(animateOut
            ? { animation: `${slideDown} 0.3s ease forwards` }
            : {}),
        }}>

        {/*<ChatInputFile />*/}
        <MessageInput
          value={value}
          setValue={setValue}
        />
      </Box>
    </>
  );
};

