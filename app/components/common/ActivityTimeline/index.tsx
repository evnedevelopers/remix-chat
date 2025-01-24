import {
  FC,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useState
} from "react";

import {
  Accordion,
  Box,
  useTheme,
  useMediaQuery,
  AccordionSummary,
  Typography,
  Button,
  AccordionDetails
} from "@mui/material";

import { Navigation, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Plus from "~/components/icons/Plus";
import KeyboardArrowDown from "~/components/icons/KeyboardArrowDown";
import ChatBubbleOutline from "~/components/icons/ChatBubbleOutline";
import { IconButton } from "~/components/uiKit/IconButton";
import { FolderItem } from "~/components/common/FolderItem";
import { ActivityMonthTimeline } from "~/components/common/ActivityMonthTimeline";

import { getDate } from "~/helpers/getDateTime";

import { IChat, IMonthChat, IYearChat } from "~/utils/typedefs";

import 'swiper/css';
import 'swiper/css/navigation';

import { styles } from './styles';

type ActivityTimelineProps = {
  list: IYearChat[];
  title: string;
  emptyStateTitle: string;
  handleClick: (id: string) => void;
  currentMonth: string | null;
  currentChatId: string | null;
  currentYear: number | null;
  isDefaultExpanded?: boolean;
  createNewChat?: () => void;
  handleAction?: (chatId: string, name: string) => void;
  isCreateChat?: boolean;
};

export const ActivityTimeline: FC<ActivityTimelineProps> = ({
  list,
  title,
  emptyStateTitle,
  handleClick,
  currentChatId,
  currentMonth,
  currentYear,
  isDefaultExpanded = true,
  createNewChat,
  handleAction,
  isCreateChat,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const [expanded, setExpanded] = useState<string | false>(
    isLg && isDefaultExpanded ? 'panel1' : false,
  );
  const [selectedMonths, setSelectedMonths] = useState<IMonthChat[]>([]);
  const [yearId, setYearId] = useState('');
  const [selectedSessions, setSelectedSessions] = useState<IChat[]>([]);
  const [monthId, setMonthId] = useState('');
  const currentMonthNumber = getDate(new Date(), 'MMMM');

  useEffect(() => {
    if (list.length) {
      const year = list.find((item) => item.id === currentYear?.toString());
      const month = year?.months.find((item) => item.id === currentMonth);
      const lastYear = list[list.length - 1];
      const lastMonth = lastYear.months[0];
      setYearId(year?.id ? year.id : lastYear?.id);
      setSelectedMonths(year?.months ? year?.months : lastYear?.months);
      setMonthId(month?.id ? month?.id : lastMonth?.id);
      setSelectedSessions(month?.chats ? month?.chats : lastMonth?.chats);
    }

    return () => {
      setSelectedSessions([]);
      setSelectedMonths([]);
    };
  }, [list, expanded]);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleClickButton = (id: string) => {
    setExpanded(false);
    handleClick(id);
  };

  const handleSelectYear = (
    event: MouseEvent<HTMLButtonElement>,
    months: IMonthChat[],
    id: string,
  ) => {
    event.stopPropagation();
    setSelectedMonths(months);
    setYearId(id);
  };

  const handleSelectMonth = (
    event: MouseEvent<HTMLButtonElement>,
    sessions: IChat[],
    id: string,
  ) => {
    event.stopPropagation();
    setSelectedSessions(sessions);
    setMonthId(id);
  };

  const [expandedMonth, setExpandedMonth] = useState<
    string | false | undefined
  >();

  const handleAccordionChange = (panel?: string) => {
    setExpandedMonth(expandedMonth === panel ? false : panel);
  };

  const handleClickActionButton = (id: string, name: string) => {
    handleAction?.(id, name);
  };

  const handleCreateNewChat = () => {
    setExpanded(false);
    createNewChat?.();
  };

  return (
    <Box>
      <Accordion
        sx={styles.aIHistory}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <AccordionSummary
          sx={styles.summary}
          expandIcon={
            <KeyboardArrowDown
              fontSize={'small'}
              htmlColor={theme.palette.text.primary}
            />
          }>
          <Box sx={styles.titleWrapper}>
            <Typography
              variant={'subtitle1'}
              color={'text.primary'}
              fontWeight={500}>
              {title}
            </Typography>
            {!!list.length && expanded && !isMd && (
              <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                {list?.map((item) => (
                  <Button
                    key={item.id}
                    sx={[styles.button, yearId === item.id && styles.active]}
                    variant={'secondary'}
                    color={'secondary'}
                    onClick={(e) => handleSelectYear(e, item.months, item.id)}>
                    <Typography variant={'button'} color={'text.disabled'}>
                      {item.id}
                    </Typography>
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={styles.details}>
          {list.length ? (
            <Box>
              {!!list.length && isMd && (
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  gap={'16px'}
                  p={'8px 20px'}>
                  {list?.map((item) => (
                    <Button
                      key={item.id}
                      sx={[styles.button2, yearId === item.id && styles.active]}
                      variant={'secondary'}
                      color={'secondary'}
                      onClick={(e) =>
                        handleSelectYear(e, item.months, item.id)
                      }>
                      <Typography variant={'button'} color={'text.disabled'}>
                        {item.id}
                      </Typography>
                    </Button>
                  ))}
                </Box>
              )}
              <Box
                sx={[
                  styles.month,
                  selectedMonths.length < 4
                    ? { justifyContent: 'flex-end' }
                    : {},
                ]}>
                {isMd
                  ? selectedMonths?.map((item) => (
                    <ActivityMonthTimeline
                      key={item.id}
                      yearId={yearId}
                      sessionsMont={item}
                      closeSidebar={() => setExpanded(false)}
                      expanded={expandedMonth}
                      onAccordionChange={handleAccordionChange}
                      handleClick={handleClick}
                      currentMonth={currentMonth}
                      currentChatId={currentChatId}
                      handleCreateNewChat={handleCreateNewChat}
                      currentMonthNumber={currentMonthNumber}
                      handleAction={handleAction}
                    />
                  ))
                  : selectedMonths?.map((item) => (
                    <Button
                      key={item.id}
                      sx={[
                        styles.button,
                        monthId === item.id && styles.active,
                      ]}
                      variant={'secondary'}
                      color={'secondary'}
                      onClick={(e) =>
                        handleSelectMonth(e, item.chats, item.id)
                      }>
                      <Typography
                        ml={'5px'}
                        variant={'body2'}
                        color={'text.disabled'}
                        fontWeight={500}
                        textTransform={'capitalize'}>
                        {item.id}
                      </Typography>
                    </Button>
                  ))}
              </Box>
              {!isMd && (
                <Box sx={styles.list}>
                  <Swiper
                    modules={[Navigation, Mousewheel]}
                    spaceBetween={16}
                    slidesPerView={'auto'}
                    mousewheel>
                    {isCreateChat && monthId && (
                      <SwiperSlide
                        style={{
                          maxWidth: 'max-content',
                          height: 'max-content',
                        }}>
                        <IconButton
                          sx={styles.createButton}
                          onClick={handleCreateNewChat}>
                          <Plus
                            fontSize={'small'}
                            htmlColor={theme.palette.text.primary}
                          />
                        </IconButton>
                      </SwiperSlide>
                    )}
                    {selectedSessions?.map((item) => (
                      <SwiperSlide key={item.id}>
                        <FolderItem
                          handleClick={() => handleClickButton(item.id)}
                          name={item.name}
                          withAction
                          active={currentChatId === item.id}
                          isLive={false}
                          handleAction={() =>
                            handleClickActionButton(item.id, item.name)
                          }
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              )}
            </Box>
          ) : (
            <Box pb={'16px'} display={'flex'} alignItems={'center'} pl={'16px'}>
              <ChatBubbleOutline
                fontSize={'small'}
                htmlColor={theme.palette.text.primary}
              />
              <Typography
                variant={'body1'}
                color={'text.secondary'}
                ml={'8px'}
                textAlign={'center'}>
                {emptyStateTitle}
              </Typography>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};