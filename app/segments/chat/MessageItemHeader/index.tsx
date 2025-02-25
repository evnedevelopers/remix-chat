import { FC, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Typography, useTheme } from "@mui/material";

import { MessageActions } from "~/segments/chat/MessageActions";
import { HumanIcon } from "~/segments/chat/MessageItem/HumanIcon";

import MoreVert from "~/components/icons/MoreVert";
import { IconContainer} from "~/components/common/IconContainer";
import { IconButton } from "~/components/uiKit/IconButton";

import { getProfile } from "~/store/bus/profile/profile.selectors";
import { IMessage } from "~/store/bus/chat/typedefs";

type MessageItemHeaderProps = {
  isICreator: boolean;
  isTypingMessage: boolean;
  chatId: number | null;
  id: number;
  rate: boolean | null;
  message: string;
  saved: string | null;
  isMockHuman: boolean;
  messageItem: IMessage;
  projectId: number;
};

import { styles } from './styles';

export const MessageItemHeader: FC<MessageItemHeaderProps> = ({
  isICreator,
  isTypingMessage,
  chatId,
  id,
  rate,
  message,
  saved,
  isMockHuman,
  messageItem,
  projectId,
}) => {
  const theme = useTheme();
  const profile = useSelector(getProfile);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={[styles.messageItemHeader, isICreator && styles.human]}>
      <Box display={'flex'} alignItems={'center'} gap={'10px'}>
        {isICreator ? (
          <Box sx={styles.logo}>
            {profile?.photo ? (
              <Box
                component={'img'}
                src={profile.photo}
                alt={'Profile image'}
              />
            ) : (
              <HumanIcon
                viewBox={'0 0 32 32'}
                htmlColor={theme.palette.text.primary}
              />
            )}
          </Box>
        ) : (
          messageItem?.project?.iconDark &&
          messageItem?.project?.iconLight && (
            <IconContainer
              darkIcon={messageItem.project.iconDark}
              lightIcon={messageItem.project.iconLight}
              size={32}
            />
          )
        )}
        {!isICreator && messageItem?.project && messageItem?.project?.name && (
          <Box
            sx={[
              styles.popular,
              projectId === messageItem?.project?.id && styles.title,
            ]}>
            <Typography
              variant={'overline'}
              fontWeight={500}
              letterSpacing={'0.4px'}
              color={
                projectId !== messageItem?.project?.id
                  ? 'common.success.contrast text'
                  : 'primary.contrastText'
              }>
              {messageItem.project.name}
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={[
          styles.wrapper,
          {
            flexDirection: isICreator ? 'row-reverse' : 'row',
          },
          isOpen && { width: '194px' },
        ]}
        onMouseEnter={() => setIsOpen(!isTypingMessage)}
        onMouseLeave={() => setIsOpen(false)}>
        <IconButton disabled={isTypingMessage} sx={styles.button}>
          <MoreVert
            sx={{ fontSize: '16px' }}
            htmlColor={theme.palette.text.primary}
          />
        </IconButton>
        <MessageActions
          chatId={chatId}
          rate={rate}
          id={id}
          message={message}
          isICreator={isICreator}
          saved={saved}
          isMockHuman={isMockHuman}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </Box>
    </Box>
  );
};