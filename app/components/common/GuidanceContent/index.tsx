import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import ShowMore from "~/components/icons/ShowMore";
import AddCircleOutline from "~/components/icons/AddCircleOutline";

import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";

import { getProjectId } from "~/store/selectors/projects.selectors";
import { projectsActions } from "~/store/actions/projects.actions";
import { uiActions } from "~/store/actions/ui.actions";
import { AppDispatch } from "~/store";

import { styles } from './styles';

type GuidanceContentProps = {
  title: string;
  text: string;
  isRead: boolean;
  isSubGuide: boolean;
  isSideBar: boolean;
  guidance_id: string;
  subguidance_id?: string;
  isSubItem?: boolean;
};

export const GuidanceContent: FC<GuidanceContentProps> = ({
  text,
  isRead,
  title,
  isSubGuide,
  isSideBar,
  guidance_id,
  subguidance_id,
}) => {
  const theme = useTheme();
  const { projectName } = useChatParams();
  const dispatch = useDispatch<AppDispatch>();
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  const projectId = useSelector(getProjectId(projectName));

  const handleClick = () => {
    !isSubGuide &&
    !isRead &&
    dispatch(
      projectsActions.readGuidance({
        guidance_id,
        subguidance_id: subguidance_id ?? null,
        projectId,
      }),
    );
    !isSubGuide && dispatch(projectsActions.fillGuidanceQuestion(text));
    !isSubGuide &&
    isLg &&
    isSideBar &&
    dispatch(uiActions.toggleSidebarDescription());
  };

  return (
    <Box sx={styles.root} zIndex={2}>
      <Box sx={styles.guidanceContent} onClick={handleClick}>
        <Box sx={styles.wrapper}>
          {isSubGuide ? (
            <ShowMore
              fontSize={'small'}
              htmlColor={
                isRead
                  ? theme.palette.text.secondary
                  : theme.palette.text.primary
              }
            />
          ) : (
            <AddCircleOutline
              fontSize={'small'}
              htmlColor={
                isRead ? theme.palette.divider : theme.palette.text.primary
              }
            />
          )}
          <Typography
            variant={'body2'}
            color={'text.secondary'}
            fontWeight={500}>
            {title}
          </Typography>
        </Box>
        <Typography variant={'body1'} color={'text.secondary'}>
          {text.length < 90 ? text : `${text.slice(0, 90)}...`}
        </Typography>
      </Box>
    </Box>
  );
};