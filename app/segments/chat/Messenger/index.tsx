import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isIOS } from 'react-device-detect';

import { MessageItem } from "~/segments/chat/MessageItem";

import { getGlobalMessageId, getIsChatTyping, getTypingMessageId } from "~/store/selectors/chat.selector";
import { getIsGlobalListening, getIsOneTimeSpeaking } from "~/store/selectors/ui.selector";

import { IMessage } from "~/utils/typedefs";

type MessengerProps = {
  messages: IMessage[];
  chatId: string;
  mainProjectId: string;
  audioLoadingId: string;
  setAudioLoadingId: (isPlaying: string) => void;
  sendMessage: any;
  value: string;
  setValue: any;
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
  // const dispatch = useDispatch();
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
      globalMessageId !== 'mock' &&
      !isTyping
    ) {
      new Promise((resolve, reject) => {
        // dispatch(
          // projectsActions.fetchMessageAudio({
          //   values: { messageId: globalMessageId },
          //   resolve,
          //   reject,
          // }),
        // );
      })
        .then(() => {
          setIsPlaying(true);
          setAudioPlayingId(globalMessageId);
          // dispatch(uiActions.stopOneTimeSpeaking());
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
            id={message.id}
            isHuman={message.author === 'human'}
            nextDate={nextDate?.created_at}
            isTypingMessage={typingMessageId === message.id}
            chatId={chatId}
            projectId={mainProjectId}
            lastHumanMessage={lastHumanMessage}
            isMockHuman={message.id === 'mockHuman'}
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