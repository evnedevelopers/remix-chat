import { useCallback } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useLoaderData}  from "@remix-run/react";
import { useSnackbar } from "notistack";
import { ILoaderFunctionResult } from "~/routes/chat";
import { getIsClosedSockets, getIsOpenedSockets, getSocketOpened } from "~/store/selectors/ws.selector";
import { getProjectsMessages } from "~/store/selectors/projects.selector";
import { IChatFile } from "~/utils/typedefs";
import {
  getCanDoAction,
  getShowBuyTokensModal,
  getShowUpdatePlanToUseTokensModal
} from "~/store/selectors/profile.slice";
import { useLimits } from "~/hooks/useLimits";
import { projectsSlice } from "~/store/slices/projects.slice";
import {useChatParams} from "~/segments/chat/view/ChatIndexView/useChatParams";

export const useChatPage = (
  value: string,
  currentChatId: string,
  setValue: (value: string) => void,
  handle: () => void,
  projectName?: string,
) => {
  const dispatch = useDispatch();
  const { chatId } = useChatParams();
  const projectsMessages = useSelector(
    getProjectsMessages(chatId, projectName),
  );
  const { enqueueSnackbar } = useSnackbar();
  const canDoAction = useSelector(getCanDoAction);
  const socketStatus = useSelector(getSocketOpened);
  const isOpenedSockets = useSelector(getIsOpenedSockets);
  const isClosedSockets = useSelector(getIsClosedSockets);
  const showBuyTokensModal = useSelector(getShowBuyTokensModal);
  const showUpdatePlanToUseTokensModal = useSelector(
    getShowUpdatePlanToUseTokensModal
  );

  const { handleLimitExceeded } = useLimits(
    showUpdatePlanToUseTokensModal,
    showBuyTokensModal,
  );

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

    // const handleFile = isFileContext || file?.error ? undefined : file?.id;

    // dispatch(
      // wsActions.sendMessageRequest({
      //   values: {
      //     action: 'request',
      //     app: 'chat',
      //     event: 'message',
      //     data: {
      //       query: question.split('\n').join('<br>'),
      //       project_id: projectId,
      //       chat_id: currentChatId,
      //       continue: null,
      //       dataset_matching: true,
      //       file_id: handleFile,
      //     },
      //   },
      // }),
    // );
    // const newMessage = {
    //   id: 'mockHuman',
    //   text: question.split('\n').join('<br>'),
    //   author: 'human',
    //   created_at: getNowDateTimeIso() + '',
    //   message_rate: null,
    //   project: {},
    //   show_create_chat_message: false,
    //   images: [],
    //   files: handleFile ? [file] : [],
    // };
    // const newAiMessage = {
    //   id: 'mock',
    //   text: '',
    //   author: 'ai',
    //   created_at: getNowDateTimeIso() + '',
    //   message_rate: null,
    //   project: {
    //     icon_light: '',
    //     icon_dark: '',
    //   },
    //   show_create_chat_message: false,
    //   images: [],
    //   files: [],
    // };
    // dispatch(
    //   projectsActions.setMessages({
    //     chatId: currentChatId,
    //     projectsMessages: [
    //       newAiMessage,
    //       newMessage,
    //       ...(projectsMessages?.results ?? []),
    //     ],
    //   }),
    // );
    // dispatch(chatActions.setMessageId('mock'));
    // scrollToBottom('anchor');

    setValue('');
    // dispatch(projectsActions.fillGuidanceQuestion(''));
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
    [socketStatus, isClosedSockets, handleSendMessage, enqueueSnackbar],
  );

  const handleCreateNewChat = () => {
    // if (!canDoAction) {
    //   handleLimitExceeded();
    //
    //   return;
    // }
    //
    // new Promise((resolve, reject) => {
    //   dispatch(
    //     projectsActions.createNewChat({
    //       values: {
    //         project_id: currentDataset?.id,
    //         projectName: currentDataset?.name,
    //         name: 'New Chat',
    //       },
    //       resolve,
    //       reject,
    //       navigate,
    //     }),
    //   );
    // })
    //   .then((data: any) => {
    //     navigate(`${book.chat}/${currentDataset?.name}/${data.id}`);
    //   })
    //   .catch();
  };

  return {
    projectsMessages: projectsMessages?.results ?? [],
    sendMessage,
    handleCreateNewChat,
  };
}