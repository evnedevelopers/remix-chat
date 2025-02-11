import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { useSnackbar } from "notistack";

import { Box, Skeleton, Typography, useTheme } from "@mui/material";

import Info from "~/components/icons/Info";
import Close from "~/components/icons/Close";
import AttachFile from "~/components/icons/AttachFile";
import { IconButton } from "~/components/uiKit/IconButton";

import { projectsActions } from "~/store/saga/projects/actions";
import { getCurrentFile } from "~/store/selectors/projects.selector";
import { AppDispatch } from "~/store";

import { styles } from './styles';

type ChatInputFileProps = {};

export const ChatInputFile: FC<ChatInputFileProps> = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { projectName, chatId } = useParams();
  const { file } = useSelector(getCurrentFile(chatId, projectName));
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFile = () => {
    new Promise((resolve, reject) => {
      dispatch(
        projectsActions.deleteChatFile({
          payload: {
            fileId: file?.id,
            chatId: chatId ? chatId : '',
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
        {file?.file_name ? (
          <Typography variant={'body1'} color={'text.primary'} ml={'10px'}>
            {file?.file_name}
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
            disabled={!file?.file_name}>
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