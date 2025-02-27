import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography, useTheme } from "@mui/material";

import Plus from "~/components/icons/Plus";
import { IconContainer } from "~/components/common/IconContainer";

import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";

import { getCurrentProject } from "~/store/bus/projects/projects.selectors";

import { wsActions } from "~/store/bus/ws/ws.actions";
import { projectsActions } from "~/store/bus/projects/projects.actions";
import { profileActions } from "~/store/bus/profile/profile.actions";
import { IMessage } from "~/store/bus/chat/typedefs";
import { getProfile } from "~/store/bus/profile/profile.selectors";
import { AppDispatch } from "~/store";

import { styles } from './styles';

type CreateChatButtonProps = {
  matchingProject: IMessage['project'];
  value: string;
  projectsMessages: IMessage[];
  currentChatId: number;
  currentProjectId: number;
  setValue: Dispatch<SetStateAction<string>>;
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
  const { projectName } = useChatParams();
  const [lastQuestion, setLastQuestion] = useState('');
  const project = useSelector(getCurrentProject(matchingProject?.name));
  const profile = useSelector(getProfile);

  useEffect(() => {
    setLastQuestion(
      projectsMessages.find((msg) => msg.author.id === 'human')?.text ?? '',
    );
  }, [projectsMessages.length]);

  const handleSendMessage = (
    chatId: number,
    projectId: number,
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
            projectId: projectId,
            authorId: profile!.id,
            chatId: chatId,
            projectName,
            datasetMatching: matching,
            continue: null,
          },
        },
        meta: {}
      }),
    );
    setValue('');
    new Promise((resolve, reject) => {
      dispatch(
        projectsActions.updateChat({
          payload: {
            id: currentChatId,
            waitingUserResponse: false,
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
    new Promise((resolve, reject) => {
      dispatch(
        projectsActions.createNewChat({
          payload: {
            projectId: matchingProject?.id,
            projectName: matchingProject?.name,
            name: 'New Chat',
          },
          meta: { resolve, reject }
        })
      );
    })
      .then((data) => {
        handleSendMessage((data as { id: number }).id, matchingProject?.id, true);
        dispatch(profileActions.setCurrentDataset(project));
      })
      .catch();
  };

  const continueSibyl = () => {
    handleSendMessage(currentChatId, currentProjectId, false);
  };

  return (
    <Box sx={styles.createChatButton}>
      <Box display={'flex'} alignItems={'center'} gap={'20px'}>
        <IconContainer
          lightIcon={matchingProject?.iconLight}
          darkIcon={matchingProject?.iconDark}
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