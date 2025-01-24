import { FC, useState } from "react";

import { Box } from "@mui/material";

import { GuidanceContent } from "~/components/common/GuidanceContent";

import { IGuidance } from "~/utils/typedefs";

import { styles } from './styles';

type GuidanceItemProps = {
  text: string;
  title: string;
  subGuide: Omit<IGuidance, 'sub_guidances'>[];
  isRead: boolean;
  guidance_id: string;
  isSideBar?: boolean;
  handleClick: () => void;
};

export const GuidanceItem: FC<GuidanceItemProps> = ({
  text,
  title,
  subGuide,
  isRead,
  guidance_id,
  isSideBar = true,
  handleClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (subGuide.length) {
      setIsExpanded(!isExpanded);
      handleClick();
    }
  };

  return (
    <Box
      sx={[
        styles.guidanceItem,
        {
          width:
            isExpanded && subGuide.length
              ? `${(subGuide.length + 1) * 320}px`
              : '320px',
        },
      ]}
      onClick={handleToggle}>
      <GuidanceContent
        title={title}
        text={text}
        isRead={isRead}
        isSubGuide={!!subGuide.length}
        isSideBar={isSideBar}
        guidance_id={guidance_id}
      />
      {subGuide.length > 0 && (
        <Box
          zIndex={1}
          sx={{
            ...styles.subGuideContainer,
            ...(isExpanded ? styles.subGuideContainerActive : {}),
          }}>
          {subGuide.map((item) => (
            <GuidanceContent
              key={item.id}
              title={item.title}
              text={item.text}
              isRead={item.is_read}
              isSubGuide={false}
              isSubItem
              isSideBar={isSideBar}
              guidance_id={guidance_id}
              subguidance_id={item.id}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};