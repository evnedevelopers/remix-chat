import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { useSnackbar } from "notistack";

import { Button, Typography } from "@mui/material";

import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";

import { getNowDateTimeIso } from "~/helpers/getDateTime";

import { useLimits } from "~/hooks/useLimits";

import { IChatFile } from "~/utils/typedefs";

import {
  getCanDoAction, getCurrentDataset,
  getShowBuyTokensModal,
  getShowUpdatePlanToUseTokensModal
} from "~/store/selectors/profile.selectors";
import { getIsClosedSockets, getIsOpenedSockets, getSocketOpened } from "~/store/selectors/ws.selectors";
import {
  getEmptyChat,
  getIsProjectsFetching,
  getProjectId,
  getProjectsMessages
} from "~/store/selectors/projects.selectors";
import { projectsSlice } from "~/store/slices/projects.slice";
import { chatSlice } from "~/store/slices/chat.slice";
import { wsActions } from "~/store/actions/ws.actions";
import { getLoadingImageData } from "~/store/selectors/chat.selectors";
import { projectsActions } from "~/store/actions/projects.actions";
import { AppDispatch } from "~/store";
import { chatActions } from "~/store/actions/chat.actions";

import { styles } from './styles';

export const useChatPage = (
  value: string,
  currentChatId: string,
  setValue: (value: string) => void,
  handle: () => void,
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
  const currentDataset = useSelector(getCurrentDataset);
  const emptyChat = useSelector(getEmptyChat(currentDataset?.name ?? ''));
  const canDoAction = useSelector(getCanDoAction);
  const showBuyTokensModal = useSelector(getShowBuyTokensModal);
  const showUpdatePlanToUseTokensModal = useSelector(
    getShowUpdatePlanToUseTokensModal,
  );

  const { handleLimitExceeded } = useLimits(
    showUpdatePlanToUseTokensModal,
    showBuyTokensModal,
  );

  useEffect(() => {
    if (!isProjectsFetching && projectsMessages === null) {
      dispatch(chatActions.fetchMessages(chatId ? chatId : '0'));
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
    handle();

    if (!canDoAction) {
      handleLimitExceeded();
      setValue('');
      dispatch(projectsSlice.actions.fillGuidanceQuestion(''));

      return;
    }

    const handleFile = isFileContext || file?.error ? undefined : file?.id;

    dispatch(
      wsActions.sendMessageRequest({
        payload: {
          action: 'request',
          app: 'chat',
          event: 'message',
          data: {
            query: question.split('\n').join('<br>'),
            project_id: projectId,
            chat_id: currentChatId,
            continue: null,
            dataset_matching: true,
            file_id: handleFile,
          },
        },
        meta: {}
      }),
    );
    const newMessage = {
      id: 'mockHuman',
      text: question.split('\n').join('<br>'),
      author: 'human',
      created_at: getNowDateTimeIso() + '',
      message_rate: null,
      project: {},
      show_create_chat_message: false,
      images: [],
      files: handleFile ? [file] : [],
    };
    const newAiMessage = {
      id: 'mock',
      text: '',
      author: 'ai',
      created_at: getNowDateTimeIso() + '',
      message_rate: null,
      project: {
        icon_light: '',
        icon_dark: '',
      },
      show_create_chat_message: false,
      images: [],
      files: [],
    };
    dispatch(
      projectsSlice.actions.setMessages({
        chatId: currentChatId,
        projectsMessages: [
          newAiMessage,
          newMessage,
          ...(projectsMessages?.results ?? []),
        ],
      }),
    );
    dispatch(chatSlice.actions.setMessageId('mock'));
    scrollToBottom('anchor');

    setValue('');
    dispatch(projectsSlice.actions.fillGuidanceQuestion(''));
  };

  const sendMessage = useCallback(
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
      alert('emptyChat')

      return;
    }

    if (!canDoAction) {
      handleLimitExceeded();

      return;
    }

    new Promise((resolve, reject) => {
      dispatch(
        projectsActions.createNewChat({
          payload: {
            project_id: currentDataset?.id || '',
            projectName: currentDataset?.name || '',
            name: 'New Chat',
          },
          meta: { resolve, reject }
        }),
      );
    })
      .then((data: any) => {
        alert("chat has been created");
        console.log(data);
      })
      .catch();
  };

  return {
    projectsMessages: projectsMessages?.results ?? [],
    sendMessage,
    handleCreateNewChat,
  };
};