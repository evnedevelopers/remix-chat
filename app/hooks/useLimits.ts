import { useDispatch, useSelector } from "react-redux";

import { LimitExhaustedContent } from "~/components/modals/LimitExhausted";

import { SubPlansCode } from "~/utils/typedefs";

import { getProfile, getQuestionLimit, getText } from "~/store/selectors/profile.selector";
import { modalSlice } from "~/store/slices/modal.slice";

type TextType =
  | 'text_line_1'
  | 'text_line_2'
  | 'text_line_3'
  | 'text_line_4'
  | 'text_line_5';

export const useLimits = (
  showUpdatePlanToUseTokensModal: boolean,
  showBuyTokensModal?: boolean | null,
  textLine?: TextType | null,
) => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const text: TextType = textLine ?? 'text_line_1';
  const defaultText = useSelector(getText(text));
  const questionLimit = useSelector(getQuestionLimit);

  const handleLimitExceeded = () => {
    if (showBuyTokensModal) {
      dispatch(
        modalSlice.actions.modal({
          component: 'LimitExhausted',
          forceClose: true,
          ...LimitExhaustedContent.buyTokens[text],
          limitText: defaultText,
          variant: 'secondary',
        }),
      );
    } else if (showUpdatePlanToUseTokensModal) {
      dispatch(
        modalSlice.actions.modal({
          component: 'LimitExhausted',
          forceClose: true,
          ...LimitExhaustedContent.updateSubscription,
          limitText: defaultText,
          variant: 'secondary',
        }),
      );
    } else {
      dispatch(
        modalSlice.actions.modal({
          component: 'LimitExceeded',
          title: 'Info',
          forceClose: true,
          text: defaultText,
          limit: questionLimit,
          description:
            profile?.subscription?.subscription_plan.code !== SubPlansCode.free
              ? `You have reached the limit of questions for today`
              : `You need to upgrade your subscription plan in order to continue using the chat`,
        }),
      );
    }
  };

  return { handleLimitExceeded };
};