import { FC, useEffect, useRef, useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from "@mui/material";

import KeyboardArrowDown from "~/components/icons/KeyboardArrowDown";
import ChatBubbleOutline from "~/components/icons/ChatBubbleOutline";
import { GuidanceItem } from "~/components/common/GuidanceItem";

import { IProjects } from "~/utils/typedefs";

import { styles } from './styles';

type GuidanceProps = {
  currentProject: IProjects | null;
  isChatPage?: boolean;
};

export const Guidance: FC<GuidanceProps> = ({
  currentProject,
  isChatPage = false,
}) => {
  const theme = useTheme();
  const [expand, setExpand] = useState(false);

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [expand]);

  return (
    <Box>
      {currentProject ? (
        <Accordion sx={styles.guidance}>
          <AccordionSummary
            sx={styles.summary}
            expandIcon={
              <KeyboardArrowDown
                fontSize={'small'}
                htmlColor={theme.palette.text.primary}
              />
            }>
            <Box
              sx={[styles.titleWrapper, isChatPage && { padding: '8px 16px' }]}>
              <Typography
                variant={'subtitle1'}
                color={'text.primary'}
                fontWeight={500}>
                Guidance
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={styles.details}>
            {currentProject?.guidances?.length ? (
              <Box sx={styles.list}>
                {currentProject.guidances.map((guide) => (
                  <Box key={guide.id} height={'120px'} flexShrink={0}>
                    <GuidanceItem
                      text={guide.text}
                      title={guide.title}
                      subGuide={guide.sub_guidances}
                      isRead={guide.is_read}
                      guidance_id={guide.id}
                      handleClick={() => setExpand(!expand)}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                pb={'16px'}
                display={'flex'}
                alignItems={'center'}
                pl={'16px'}>
                <ChatBubbleOutline
                  fontSize={'small'}
                  htmlColor={theme.palette.text.primary}
                />
                <Typography
                  variant={'body1'}
                  color={'text.secondary'}
                  ml={'8px'}
                  textAlign={'center'}>
                  {`There are no guidance yet`}
                </Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ) : (
        <Box height={'51.5px'} />
      )}
    </Box>
  );
};