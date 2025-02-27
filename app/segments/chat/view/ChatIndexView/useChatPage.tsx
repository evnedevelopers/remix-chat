import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { useSnackbar } from "notistack";

import { Button, Typography } from "@mui/material";

import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";


import { getCurrentDataset, getProfile } from "~/store/bus/profile/profile.selectors";
import { getIsClosedSockets, getIsOpenedSockets, getSocketOpened } from "~/store/bus/ws/ws.selectors";
import {
  getEmptyChat,
  getIsProjectsFetching,
  getProjectId,
  getProjectsMessages
} from "~/store/bus/projects/projects.selectors";
import { projectsSlice } from "~/store/bus/projects/projects.slice";
import { chatSlice } from "~/store/bus/chat/chat.slice";
import { wsActions } from "~/store/bus/ws/ws.actions";
import { getLoadingImageData } from "~/store/bus/chat/chat.selectors";
import { projectsActions } from "~/store/bus/projects/projects.actions";
import { chatActions } from "~/store/bus/chat/chat.actions";
import { IChatFile } from "~/store/bus/chat/typedefs";
import { AppDispatch } from "~/store";

import { styles } from './styles';

export type SendMessageFunction = (
  question: string,
  isFileContext: boolean,
  file?: (IChatFile | null)
) => void;

export const useChatPage = (
  value: string,
  currentChatId: number,
  setValue: (value: string) => void,
  projectName?: string,
) => {
  const { chatId } = useChatParams();
  const projectsMessages = useSelector(
    getProjectsMessages(chatId, projectName),
  );
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const socketStatus = useSelector(getSocketOpened);
  const isOpenedSockets = useSelector(getIsOpenedSockets);
  const isClosedSockets = useSelector(getIsClosedSockets);
  const isProjectsFetching = useSelector(getIsProjectsFetching);
  const loadingImageData = useSelector(getLoadingImageData);
  const projectId = useSelector(getProjectId(projectName));
  const profile = useSelector(getProfile);
  const currentDataset = useSelector(getCurrentDataset);
  const emptyChat = useSelector(getEmptyChat(currentDataset?.name ?? ''));

  useEffect(() => {
    if (!isProjectsFetching && projectsMessages === null) {
      dispatch(chatActions.fetchMessages(chatId ? chatId : 0));
    }
  }, [chatId, isProjectsFetching]);

  const scrollToBottom = (to: string) => {
    dispatch(chatSlice.actions.setLoadingImageId(null));
    const id = document.getElementById(to);
    if (id) {
      id.scrollIntoView();
    }
  };

  useEffect(() => {
    if (!loadingImageData) {
      return;
    }
    if (chatId && chatId === loadingImageData?.chatId) {
      enqueueSnackbar('The Images were generated', {
        variant: 'infoSnackbar',
        autoHideDuration: 5000,
        action: () => (
          <Button
            sx={styles.action}
            variant={'primary'}
            onClick={() => scrollToBottom(loadingImageData.imageId.toString())}>
            <Typography variant={'button'} color={'primary.contrastText'}>
              View
            </Typography>
          </Button>
        ),
      });

      return;
    }

    if (chatId && chatId !== loadingImageData?.chatId) {
      return;
    }
  }, [loadingImageData, chatId, projectName]);

  const handleSendMessage = (
    question: string,
    isFileContext: boolean,
    file?: IChatFile | null,
  ) => {
    const handleFile = isFileContext || file?.error ? undefined : file?.id;

    dispatch(
      wsActions.sendMessageRequest({
        payload: {
          action: 'request',
          app: 'chat',
          event: 'message',
          data: {
            query: question.split('\n').join('<br>'),
            projectId: projectId,
            authorId: profile!.id,
            chatId: currentChatId,
            projectName,
            continue: null,
            datasetMatching: true,
            fileId: handleFile,
          },
        },
        meta: {}
      }),
    );

    scrollToBottom('anchor');

    setValue('');
    dispatch(projectsSlice.actions.fillGuidanceQuestion(''));
  };

  const sendMessage: SendMessageFunction = useCallback(
    (question: string, isFileContext: boolean, file?: IChatFile | null) => {
      if (socketStatus === 'closed') {
        enqueueSnackbar('Connection lost', {
          variant: 'error',
        });

        return;
      }
      if (socketStatus === 'open' && isClosedSockets) {
        enqueueSnackbar('Connection restored', {
          variant: 'success',
        });
        handleSendMessage(question, isFileContext, file);

        return;
      }
      handleSendMessage(question, isFileContext, file);
    },
    [
      socketStatus,
      value,
      isClosedSockets,
      isOpenedSockets,
      projectsMessages?.results,
    ],
  );

  const handleCreateNewChat = () => {
    if (emptyChat) {
      alert('emptyChat');
      return;
    }

    new Promise((resolve, reject) => {
      dispatch(
        projectsActions.createNewChat({
          payload: {
            projectId: currentDataset?.id || 0,
            projectName: currentDataset?.name || '',
            name: 'New Chat',
          },
          meta: { resolve, reject }
        }),
      );
    })
      .then(() => {
        alert("chat has been created");
      })
      .catch();
  };

  return {
    projectsMessages: projectsMessages?.results ?? [],
    sendMessage,
    handleCreateNewChat,
  };
};