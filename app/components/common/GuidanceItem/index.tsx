import { FC, useState } from "react";

import { Box } from "@mui/material";

import { GuidanceContent } from "~/components/common/GuidanceContent";

import { IGuidance } from "~/store/bus/projects/typedefs";

import { styles } from './styles';

type GuidanceItemProps = {
  text: string;
  title: string;
  subGuide: Omit<IGuidance, 'subGuidances'>[];
  isRead: boolean;
  guidanceId: number;
  isSideBar?: boolean;
  handleClick: () => void;
};

export const GuidanceItem: FC<GuidanceItemProps> = ({
  text,
  title,
  subGuide,
  isRead,
  guidanceId,
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
        guidanceId={guidanceId}
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
              isRead={item.isRead}
              isSubGuide={false}
              isSubItem
              isSideBar={isSideBar}
              guidanceId={guidanceId}
              subguidanceId={item.id}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};