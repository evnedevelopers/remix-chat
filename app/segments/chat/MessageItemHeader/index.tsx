import { FC, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Typography, useTheme } from "@mui/material";

import { MessageActions } from "~/segments/chat/MessageActions";
import { HumanIcon } from "~/segments/chat/MessageItem/HumanIcon";

import MoreVert from "~/components/icons/MoreVert";
import { IconContainer} from "~/components/common/IconContainer";
import { IconButton } from "~/components/uiKit/IconButton";

import { getProfile } from "~/store/selectors/profile.selectors";

import { IMessage } from "~/utils/typedefs";

type MessageItemHeaderProps = {
  isHuman: boolean;
  isTypingMessage: boolean;
  chatId: string | null;
  id: string;
  rate: boolean | null;
  message: string;
  saved: string | null;
  isMockHuman: boolean;
  messageItem: IMessage;
  projectId: string;
};

import { styles } from './styles';

export const MessageItemHeader: FC<MessageItemHeaderProps> = ({
  isHuman,
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
    <Box sx={[styles.messageItemHeader, isHuman && styles.human]}>
      <Box display={'flex'} alignItems={'center'} gap={'10px'}>
        {isHuman ? (
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
          messageItem?.project?.icon_dark &&
          messageItem?.project?.icon_light && (
            <IconContainer
              darkIcon={messageItem.project.icon_dark}
              lightIcon={messageItem.project.icon_light}
              size={32}
            />
          )
        )}
        {!isHuman && messageItem?.project && messageItem?.project?.name && (
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
            flexDirection: isHuman ? 'row-reverse' : 'row',
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
          isHuman={isHuman}
          saved={saved}
          isMockHuman={isMockHuman}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </Box>
    </Box>
  );
};