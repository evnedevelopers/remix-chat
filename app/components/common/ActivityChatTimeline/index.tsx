import { FC, MouseEvent } from "react";

import { Box, IconButton, ListItem, ListItemButton, Typography, useTheme } from "@mui/material";

import Edit from "~/components/icons/Edit";

import { IChat } from "~/utils/typedefs";

import { styles } from './styles';

type ActivityChatTimelineProps = {
  session: IChat;
  closeSidebar?: () => void;
  monthId: string;
  yearId: string;
  handleClick: (id: string) => void;
  currentChatId: string | null;
  handleAction?: () => void;
};

export const ActivityChatTimeline: FC<ActivityChatTimelineProps> = ({
  session,
  closeSidebar,
  handleClick,
  currentChatId,
  handleAction,
}) => {
  const theme = useTheme();
  const handleNavigate = () => {
    if (closeSidebar) {
      closeSidebar();
    }
    handleClick(session.id);
  };

  const editOrCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleAction?.();
  };

  return (
    <ListItem
      key={session.id}
      disablePadding
      sx={[styles.item, currentChatId === session.id && styles.activeItem]}>
      <ListItemButton onClick={handleNavigate}>
        <Box display={'flex'} alignItems={'center'} gap={'10px'}>
          <Typography
            variant={'body2'}
            maxWidth={'225px'}
            color={'text.secondary'}
            fontWeight={500}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}>
            {session.name}
          </Typography>
        </Box>
        {currentChatId === session.id && (
          <IconButton
            color={'success'}
            onClick={editOrCancel}
            sx={styles.button}>
            <Edit fontSize={'small'} htmlColor={theme.palette.text.secondary} />
          </IconButton>
        )}
      </ListItemButton>
    </ListItem>
  );
};