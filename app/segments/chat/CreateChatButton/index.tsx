import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography, useTheme } from "@mui/material";

import Plus from "~/components/icons/Plus";
import { IconContainer } from "~/components/common/IconContainer";

import { getNowDateTimeIso } from "~/helpers/getDateTime";

import { useLimits } from "~/hooks/useLimits";

import { getCurrentProject } from "~/store/selectors/projects.selectors";
import {
  getCanDoAction,
  getShowBuyTokensModal,
  getShowUpdatePlanToUseTokensModal
} from "~/store/selectors/profile.selectors";

import { wsActions } from "~/store/actions/ws.actions";
import { projectsActions } from "~/store/actions/projects.actions";
import { chatActions } from "~/store/actions/chat.actions";
import { profileActions } from "~/store/actions/profile.actions";
import { AppDispatch } from "~/store";

import { IMessage } from "~/utils/typedefs";

import { styles } from './styles';

type CreateChatButtonProps = {
  matchingProject: any;
  value: string;
  projectsMessages: IMessage[];
  currentChatId: string;
  currentProjectId: string;
  setValue: any;
};

export const CreateChatButton: FC<CreateChatButtonProps> = ({
  matchingProject,
  value,
  projectsMessages,
  currentChatId,
  currentProjectId,
  setValue,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [lastQuestion, setLastQuestion] = useState('');
  const project = useSelector(getCurrentProject(matchingProject?.name));
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
    setLastQuestion(
      projectsMessages.find((msg) => msg.author === 'human')?.text ?? '',
    );
  }, [projectsMessages.length]);

  const handleSendMessage = (
    chatId: string,
    projectId: string,
    projectsMessages: IMessage[],
    matching: boolean,
  ) => {
    dispatch(projectsActions.fillMatchingProject(null));
    dispatch(
      wsActions.sendMessageRequest({
        payload: {
          action: 'request',
          app: 'chat',
          event: 'message',
          data: {
            query: (value || lastQuestion).split('\n').join('<br>'),
            project_id: projectId,
            chat_id: chatId,
            dataset_matching: matching,
            continue: null,
          },
        },
        meta: {}
      }),
    );
    const newMessage = {
      id: 'mockHuman',
      text: (value || lastQuestion).split('\n').join('<br>'),
      author: 'human',
      created_at: getNowDateTimeIso() + '',
      message_rate: null,
      project: {},
      images: [],
      files: [],
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
      images: [],
      files: [],
    };
    dispatch(
      projectsActions.setMessages({
        chatId,
        projectsMessages: [newAiMessage, newMessage, ...projectsMessages],
      }),
    );
    dispatch(chatActions.setMessageId('mock'));
    setValue('');
    new Promise((resolve, reject) => {
      dispatch(
        projectsActions.updateChat({
          payload: {
            id: currentChatId,
            waiting_user_response: false,
          },
          meta: {
            resolve,
            reject,
          }
        }),
      );
    })
      .then()
      .catch();
  };

  const createNewChat = () => {
    if (!canDoAction) {
      handleLimitExceeded();

      return;
    }

    new Promise((resolve, reject) => {
      dispatch(
        projectsActions.createNewChat({
          payload: {
            project_id: matchingProject?.id,
            projectName: matchingProject?.name,
            name: 'New Chat',
          },
          meta: { resolve, reject }
        })
      );
    })
      .then((data: any) => {
        handleSendMessage(data.id, matchingProject?.id, [], true);
        dispatch(profileActions.setCurrentDataset(project));
      })
      .catch();
  };

  const continueSibyl = () => {
    if (!canDoAction) {
      handleLimitExceeded();

      return;
    }

    handleSendMessage(currentChatId, currentProjectId, projectsMessages, false);
  };

  return (
    <Box sx={styles.createChatButton}>
      <Box display={'flex'} alignItems={'center'} gap={'20px'}>
        <IconContainer
          lightIcon={matchingProject?.icon_light}
          darkIcon={matchingProject?.icon_dark}
          size={32}
        />
        <Typography
          variant={'body1'}
          color={'text.secondary'}
          maxWidth={'670px'}>
          {`The ${matchingProject?.name} dataset responded to you because it perfectly matches your
          request. We suggest continuing the conversation with it in a separate
          chat.`}
        </Typography>
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={'10px'}>
        <Button variant={'secondary'} onClick={continueSibyl}>
          <Typography
            variant={'overline'}
            color={'text.primary'}
            sx={{ textWrap: 'nowrap' }}
            fontWeight={500}
            fontSize={'13px'}
            mr={'16px'}>
            Ask Sibyl
          </Typography>
          <IconContainer
            darkIcon={'/assets/darkLogo.png'}
            lightIcon={'/assets/lightLogo.png'}
            size={24}
          />
        </Button>
        <Button
          variant={'primary'}
          onClick={createNewChat}
          endIcon={
            <Plus
              fontSize={'small'}
              htmlColor={theme.palette.common.text.contrast}
            />
          }>
          <Typography
            variant={'overline'}
            color={'common.text.contrast'}
            fontWeight={500}
            fontSize={'13px'}>
            Continue
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};