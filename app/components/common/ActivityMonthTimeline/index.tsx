import { FC, useEffect } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  useTheme
} from "@mui/material";

import KeyboardArrowRight from "~/components/icons/KeyboardArrowRight";
import Plus from "~/components/icons/Plus";
import { ActivityChatTimeline } from "~/components/common/ActivityChatTimeline";

import { IMonthChat } from "~/utils/typedefs";

import { styles } from './styles';

type ActivityMonthTimelineProps = {
  yearId: string;
  sessionsMont: IMonthChat;
  closeSidebar?: () => void;
  // isCurrentYear: boolean;
  expanded?: string | false;
  onAccordionChange: (panel?: string) => void;
  handleClick: (id: string) => void;
  currentMonth: string | null;
  currentChatId: string | null;
  handleCreateNewChat: () => void;
  currentMonthNumber: string | null;
  handleAction?: (chatId: string, name: string) => void;
};

export const ActivityMonthTimeline: FC<ActivityMonthTimelineProps> = ({
  yearId,
  sessionsMont,
  closeSidebar,
  expanded,
  onAccordionChange,
  // isCurrentYear,
  handleClick,
  currentMonth,
  currentChatId,
  handleCreateNewChat,
  handleAction,
}) => {
  const theme = useTheme();

  useEffect(() => {
    onAccordionChange(currentMonth ?? undefined);
  }, []);

  const handleChange = () => {
    onAccordionChange(sessionsMont.id);
  };

  return (
    <Accordion
      sx={[
        styles.datasetItem,
        currentMonth === sessionsMont.id && styles.active,
      ]}
      expanded={expanded === sessionsMont.id}
      onChange={handleChange}
      key={sessionsMont.id}>
      <AccordionSummary
        sx={styles.summary}
        expandIcon={
          <KeyboardArrowRight
            fontSize={'small'}
            htmlColor={theme.palette.text.disabled}
          />
        }>
        <Box sx={styles.titleWrapper} gap={'10px'}>
          <Typography variant={'body2'} color={'text.primary'} fontWeight={500}>
            {sessionsMont.id.slice(0, 3)}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={styles.details}>
        <List sx={styles.list}>
          <ListItem disablePadding sx={styles.item}>
            <ListItemButton onClick={handleCreateNewChat}>
              <Plus fontSize={'small'} htmlColor={theme.palette.text.primary} />
            </ListItemButton>
          </ListItem>
          {sessionsMont.chats.map((session) => (
            <ActivityChatTimeline
              key={session.id}
              session={session}
              closeSidebar={closeSidebar}
              monthId={sessionsMont.id}
              yearId={yearId}
              handleClick={handleClick}
              currentChatId={currentChatId}
              handleAction={() => handleAction?.(session.id, session.name)}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
