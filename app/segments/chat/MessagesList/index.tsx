import {FC, useRef, useState} from "react";

import { IMessage } from "~/utils/typedefs";

import { styles } from './styles';
import {useChatParams} from "~/segments/chat/view/ChatIndexView/useChatParams";
import {useSelector} from "react-redux";
import {getNewestMessageId, getOldestMessageId, getProjectId} from "~/store/selectors/projects.selector";
import {Box} from "@mui/material";

type MessagesListProps = {
  size: number;
  currentChatId: string;
  projectsMessages: IMessage[];
  scrollToBottom: () => void;
  setVisible: (value: boolean) => void;
  // eslint-disable-next-line
  sendMessage: any;
  value: string;
  // eslint-disable-next-line
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
  const { projectName, chatId } = useChatParams();
  const ref = useRef<HTMLDivElement>();
  const oldestId = useSelector(getOldestMessageId(chatId, projectName));
  const newestId = useSelector(getNewestMessageId(chatId, projectName));
  const mainProjectId = useSelector(getProjectId(projectName));
  const [totalScrollHeight, setTotalScrollHeight] = useState(0);
  // const scrollToMessageId = useSelector(getScrollToMessageId);
  const [audioLoadingId, setAudioLoadingId] = useState<number | string>(0);

  const handleScrolls = (e: any) => {}

  return (
    <Box
      sx={(theme) => styles.messagesList(theme, size)}
      ref={ref}
      onScroll={(e) => handleScrolls(e)}>
      <Box id={'anchor'} />
      <Box sx={styles.list}>

      </Box>
    </Box>
  );
};