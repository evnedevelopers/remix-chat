import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { wsActions } from "../../../store/bus/ws/ws.actions";
import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";
import { getProfile } from "~/store/bus/profile/profile.selectors";

export const useUserTyping = (delay = 1000) => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatId } = useChatParams();
  const profile = useSelector(getProfile);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [lastTyped, setLastTyped] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastTyped >= delay) {
        setIsTyping(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [lastTyped, delay]);

  const handleUserTyping = () => {
    setIsTyping(true);
    setLastTyped(Date.now());
  }

  const memoIsTyping = useMemo(() => isTyping, [isTyping]);

  useEffect(() => {
    dispatch(
      wsActions.sendMessageRequest({
        payload: {
          action: 'request',
          app: 'chat',
          event: 'typing',
          data: {
            chatId,
            authorId: profile!.id,
            isTyping: memoIsTyping,
          }
        },
        meta: {}
      })
    )
  }, [memoIsTyping]);

  return {
    handleUserTyping,
  }
}