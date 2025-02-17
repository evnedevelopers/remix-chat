import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LimitExhaustedContent } from "~/components/modals/LimitExhausted";

import { useTokensDisclaimer } from "~/hooks/useTokensDisclaimer";

import {
  getIsVisualAdjustments,
  getProfile,
  getVisualizeLimit, getVisualizeText,
  getVisualizingLimit
} from "~/store/selectors/profile.selectors";

import { projectsActions } from "~/store/actions/projects.actions";
import { wsActions } from "~/store/actions/ws.actions";
import { modalActions } from "~/store/actions/modal.actions";
import { AppDispatch } from "~/store";

import { IMessage, SubPlansCode } from "~/utils/typedefs";

export const useMessageItemButtons = (
  messageItem: IMessage,
  isPlaying: boolean,
  setAudioLoadingId: (id: string) => void,
  setAudioPlayingId: (id: string) => void,
  setIsPlaying: (play: boolean) => void,
  projectId: string,
  chatId: string | null,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const isVisualAdjustments = useSelector(getIsVisualAdjustments);
  const profile = useSelector(getProfile);
  const limit = useSelector(getVisualizingLimit);
  const visualizeLimit = useSelector(getVisualizeLimit);
  const textLine2 = useSelector(getVisualizeText);
  const { handle } = useTokensDisclaimer('visualizations');
  const handleGetAudio = (event: MouseEvent<HTMLButtonElement>) => {
    setAudioLoadingId(messageItem.id);
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
          setAudioPlayingId(messageItem.id);
        })
        .catch((error) => {
          return error;
        });
    }
    if (messageItem.audio && !isPlaying) {
      setIsPlaying(true);
      setAudioPlayingId(messageItem.id);
    }
  };

  const handleVisualizeRequest = () => {
    if (isVisualAdjustments) {
      dispatch(projectsActions.clearVisualizePrompt());
      dispatch(
        modalActions.modal({
          component: 'VisualAdjustments',
          title: 'Visual Adjustments',
          sx: { maxWidth: '480px!important', width: '100%' },
          forceClose: true,
          messageId: messageItem.id,
          limit: limit,
          projectId: projectId,
          chatId: chatId,
        }),
      );

      return;
    }

    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_visualization_price ?? 0);

    if (limit > 0 || enoughTokens) {
      handle();
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
    } else {
      if (profile?.subscription?.visualize_limits === 0 && !enoughTokens) {
        dispatch(
          modalActions.modal({
            component: 'LimitExhausted',
            forceClose: true,
            ...LimitExhaustedContent.buyTokens.text_line_2,
            limitText: textLine2,
            variant: 'secondary',
          }),
        );
      } else {
        dispatch(
          modalActions.modal({
            component: 'LimitExceeded',
            title: 'Info',
            forceClose: true,
            text: 'Visualizations / day',
            limit: visualizeLimit,
            description:
              profile?.subscription?.subscription_plan.code !==
              SubPlansCode.free
                ? `You have reached the limit of visualizations for today`
                : `You need to upgrade your subscription plan in order to continue using
            the chat`,
          }),
        );
      }
    }
  };

  const handleNavigate = () => {
    alert('handleNavigate');
  };

  return { handleGetAudio, handleVisualizeRequest, handleNavigate };
};