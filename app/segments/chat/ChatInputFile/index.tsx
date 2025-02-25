import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSnackbar } from "notistack";

import { Box, Skeleton, Typography, useTheme } from "@mui/material";

import Info from "~/components/icons/Info";
import Close from "~/components/icons/Close";
import AttachFile from "~/components/icons/AttachFile";
import { IconButton } from "~/components/uiKit/IconButton";

import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";

import { projectsActions } from "~/store/bus/projects/projects.actions";
import { getCurrentFile } from "~/store/bus/projects/projects.selectors";
import { AppDispatch } from "~/store";

import { styles } from './styles';

export const ChatInputFile: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { projectName, chatId = 0 } = useChatParams();
  const { file } = useSelector(getCurrentFile(chatId, projectName));
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFile = () => {
    new Promise((resolve, reject) => {
      dispatch(
        projectsActions.deleteChatFile({
          payload: {
            fileId: file?.id || 0,
            chatId,
          },
          meta: { resolve, reject }
        }),
      );
    })
      .then(() => {
        enqueueSnackbar('The file was deleted', { variant: 'infoSnackbar' });
      })
      .catch();
  };

  return (
    <Box sx={[styles.root, file?.error ? styles.error : {}]}>
      <Box display={'flex'}>
        {file?.error ? (
          <Info
            sx={{ fontSize: '20px' }}
            htmlColor={theme.palette.text.primary}
          />
        ) : (
          <AttachFile
            sx={{ fontSize: '20px' }}
            htmlColor={theme.palette.text.primary}
          />
        )}
        {file?.filename ? (
          <Typography variant={'body1'} color={'text.primary'} ml={'10px'}>
            {file?.filename}
          </Typography>
        ) : (
          <Skeleton
            variant={'text'}
            sx={{
              fontSize: '16px',
              width: '150px',
              lineHeight: '19.5px',
              ml: '10px',
            }}
          />
        )}
      </Box>
      {!file?.error && (
        <Box>
          <IconButton
            sx={styles.itemButton}
            onClick={handleDeleteFile}
            disabled={!file?.filename}>
            <Close
              sx={{ fontSize: '20px' }}
              htmlColor={theme.palette.text.primary}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};