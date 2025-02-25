import { MouseEvent } from "react";
import { useDispatch } from "react-redux";

import { projectsActions } from "~/store/bus/projects/projects.actions";
import { wsActions } from "~/store/bus/ws/ws.actions";
import { IMessage } from "~/store/bus/chat/typedefs";
import { AppDispatch } from "~/store";

export const useMessageItemButtons = (
  messageItem: IMessage,
  isPlaying: boolean,
  setAudioLoadingId: (id: number) => void,
  setAudioPlayingId: (id: number) => void,
  setIsPlaying: (play: boolean) => void,
  projectId: number,
  chatId: number | null,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleGetAudio = (event: MouseEvent<HTMLButtonElement>) => {
    setAudioLoadingId(messageItem.id as number);
    event.stopPropagation();
    if (isPlaying) {
      setIsPlaying(false);
    }
    if (!messageItem.audio) {
      new Promise((resolve, reject) => {
        dispatch(
          projectsActions.fetchMessageAudio({
            payload: { messageId: messageItem.id },
            meta: { resolve, reject }
          }),
        );
      })
        .then(() => {
          setIsPlaying(true);
          setAudioPlayingId(messageItem.id as number);
        })
        .catch((error) => {
          return error;
        });
    }
    if (messageItem.audio && !isPlaying) {
      setIsPlaying(true);
      setAudioPlayingId(messageItem.id as number);
    }
  };

  const handleVisualizeRequest = () => {
    dispatch(
      wsActions.sendMessageRequest({
        payload: {
          action: 'request',
          app: 'chat',
          event: 'visualize',
          data: {
            project_id: projectId,
            chat_id: chatId,
            message_id: messageItem.id,
          },
        },
        meta: {}
      }),
    );
  };

  const handleNavigate = () => {
    alert('handleNavigate');
  };

  return { handleGetAudio, handleVisualizeRequest, handleNavigate };
};