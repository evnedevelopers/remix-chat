import { FC } from "react";
import { DateTime } from "luxon";

import { Box, Typography } from "@mui/material";

import { getDateTime } from "~/helpers/getDateTime";

import { styles } from './styles';

type MessageTimeBadgeProps = {
  date: string;
  fullDate?: boolean;
};

export const MessageTimeBadge: FC<MessageTimeBadgeProps> = ({
  date,
  fullDate = false,
}) => {
  const renderBadge = () => {
    const now = DateTime.now();
    const today = now.startOf('day');
    const yesterday = now.minus({ days: 1 }).startOf('day');
    const timestamp = DateTime.fromJSDate(new Date(date));
    const isToday = timestamp.hasSame(today, 'day');
    const isYesterday = timestamp.hasSame(yesterday, 'day');
    const isAnotherYear = !timestamp.hasSame(today, 'year');

    if (isToday) {
      return 'Today';
    }

    if (isYesterday) {
      return 'Yesterday';
    }
    if (isAnotherYear) {
      return timestamp.toFormat('MMMM dd, yyyy');
    }

    return timestamp.toFormat('MMMM dd');
  };

  return (
    <Box sx={styles.messageTimeBadge}>
      <Box sx={styles.line} />
      <Box sx={styles.badge}>
        <Typography
          variant={'body1'}
          color={'text.secondary'}
          whiteSpace={'nowrap'}>
          {fullDate ? getDateTime(date, 'MMMM dd, yyyy') : renderBadge()}
        </Typography>
      </Box>
      <Box sx={styles.line} />
    </Box>
  );
};