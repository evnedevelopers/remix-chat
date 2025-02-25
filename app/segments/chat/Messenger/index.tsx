import { FC, useEffect, useState, SetStateAction, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isIOS } from 'react-device-detect';

import { MessageItem } from "~/segments/chat/MessageItem";
import { SendMessageFunction } from "~/segments/chat/view/ChatIndexView/useChatPage";

import { getGlobalMessageId, getIsChatTyping, getTypingMessageId } from "~/store/bus/chat/chat.selectors";
import { getIsGlobalListening, getIsOneTimeSpeaking } from "~/store/bus/ui/ui.selectors";
import { projectsActions } from "~/store/bus/projects/projects.actions";
import { uiActions } from "~/store/bus/ui/ui.actions";
import { AppDispatch } from "~/store";
import { IMessage } from "~/store/bus/chat/typedefs";

type MessengerProps = {
  messages: IMessage[];
  chatId: number;
  mainProjectId: number;
  audioLoadingId: number;
  setAudioLoadingId: Dispatch<SetStateAction<number>>;
  sendMessage: SendMessageFunction;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const Messenger: FC<MessengerProps> = ({
  messages,
  chatId,
  audioLoadingId,
  setAudioLoadingId,
  mainProjectId,
  sendMessage,
  setValue,
  value,
}) => {
  const typingMessageId = useSelector(getTypingMessageId);
  const isGlobalListening = useSelector(getIsGlobalListening);
  const oneTimeSpeaking = useSelector(getIsOneTimeSpeaking);
  const globalMessageId = useSelector(getGlobalMessageId);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isTyping = useSelector(getIsChatTyping);

  const handleAudioPlay = (audio: boolean) => {
    setIsPlaying(audio);
  };

  const [audioPlayingId, setAudioPlayingId] = useState<string | number>(0);

  const handleSetAudioPlayingId = (id: string | number) => {
    setAudioPlayingId(id);
  };

  useEffect(() => {
    if (
      !isIOS &&
      globalMessageId &&
      (isGlobalListening || oneTimeSpeaking) &&
      !isTyping
    ) {
      new Promise((resolve, reject) => {
        dispatch(
          projectsActions.fetchMessageAudio({
            payload: { messageId: globalMessageId },
            meta: { resolve, reject },
          }),
        );
      })
        .then(() => {
          setIsPlaying(true);
          setAudioPlayingId(globalMessageId);
          dispatch(uiActions.stopOneTimeSpeaking());
        })
        .catch((error) => {
          return error;
        });
    }
  }, [globalMessageId, isGlobalListening, isTyping]);

  return (
    <>
      {messages.map((message, index, messages) => {
        const nextDate = messages[index + 1];
        const lastHumanMessage = messages[index + 1]?.text;

        return (
          <MessageItem
            key={message.id}
            id={message.id as number}
            isHuman={message.author === 'human'}
            nextDate={nextDate?.createdAt}
            isTypingMessage={typingMessageId === message.id}
            chatId={chatId}
            projectId={mainProjectId}
            lastHumanMessage={lastHumanMessage}
            isMockHuman={false}
            isPlaying={isPlaying}
            setIsPlaying={handleAudioPlay}
            audioPlayingId={audioPlayingId}
            setAudioPlayingId={handleSetAudioPlayingId}
            audioLoadingId={audioLoadingId}
            setAudioLoadingId={setAudioLoadingId}
            messageItem={message}
            sendMessage={sendMessage}
            value={value}
            setValue={setValue}
          />
        );
      })}
    </>
  );
};