import { ChangeEvent, FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, useTheme } from "@mui/material";

import AttachFile from "~/components/icons/AttachFile";
import { IconButton } from "~/components/uiKit/IconButton";

import { getValidToken, removeQuotes } from "~/segments/chat/MessageInput/useAudioRecorder";

import { handleErrors } from "~/helpers/handleErrors";

import { getIsChatTyping } from "~/store/selectors/chat.selector";
import { projectsSlice } from "~/store/slices/projects.slice";

import { IChatFile } from "~/utils/typedefs";

type MessageInputFileButtonProps = {
  chatId?: string;
  file: IChatFile | null;
};

export const MessageInputFileButton: FC<MessageInputFileButtonProps> = ({
  chatId,
  file,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isTyping = useSelector(getIsChatTyping);
  const theme = useTheme();

  const save = async (files: File[]) => {
    if (files.length > 0) {
      const tokenAccess = await getValidToken();
      const formData = new FormData();
      formData.append('file', files[0], files[0].name);
      try {
        dispatch(projectsSlice.actions.startFileFetching());
        dispatch(
          projectsSlice.actions.fillChatFile({
            data: {
              id: '1',
              file: '',
              created_at: '',
              file_name: '',
            },
            chatId: chatId || '',
          }),
        );
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/chats/${
            chatId ? +chatId : 0
          }/files`,
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: 'Bearer ' + removeQuotes(tokenAccess!),
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          dispatch(
            projectsSlice.actions.fillChatFile({
              data: {
                id: '1',
                file: '',
                created_at: '',
                file_name: data.error,
                error: true,
              },
              chatId: chatId || '',
            }),
          );
        } else {
          dispatch(
            projectsSlice.actions.fillChatFile({
              data,
              chatId: chatId || '',
            }),
          );
        }
      } catch (error) {
        handleErrors(error);
      } finally {
        dispatch(projectsSlice.actions.stopFileFetching());
      }
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles: File[] = Array.from(e.target.files);

      if (selectedFiles.length > 0) {
        save(selectedFiles);

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return !file || file?.error ? (
    <Box display={'flex'}>
      <input
        ref={fileInputRef}
        accept={'.pdf'}
        id={'upload-chat-file'}
        type={'file'}
        style={{ display: 'none' }}
        onChange={handleImageChange}
        data-testid={'change-user-information-photo'}
      />
      <label htmlFor={'upload-chat-file'}>
        <IconButton
          onClick={handleButtonClick}
          color={'secondary'}
          disabled={isTyping}>
          <AttachFile
            fontSize={'small'}
            htmlColor={theme.palette.text.primary}
          />
        </IconButton>
      </label>
    </Box>
  ) : null;
};