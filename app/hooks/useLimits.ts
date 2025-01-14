import { useDispatch, useSelector } from 'react-redux';
// import { getProfile, getQuestionLimit, getText } from '@bus/profile/selectors';
import {useLoaderData} from "@remix-run/react";
import {ILoaderFunctionResult} from "~/routes/chat";
import {getQuestionLimit, getText} from "~/store/selectors/profile.slice";

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
  const { authUser: profile } = useLoaderData<ILoaderFunctionResult>();
  const text: TextType = textLine ?? 'text_line_1';
  const defaultText = useSelector(getText(text));
  const questionLimit = useSelector(getQuestionLimit);

  const handleLimitExceeded = () => {
    if (showBuyTokensModal) {
      // dispatch(
        // modalActions.modal({
        //   component: 'LimitExhausted',
        //   forceClose: true,
        //   ...LimitExhaustedContent.buyTokens[text],
        //   limitText: defaultText,
        //   variant: 'secondary',
        // }),
      // );
    } else if (showUpdatePlanToUseTokensModal) {
      // dispatch(
        // modalActions.modal({
        //   component: 'LimitExhausted',
        //   forceClose: true,
        //   ...LimitExhaustedContent.updateSubscription,
        //   limitText: defaultText,
        //   variant: 'secondary',
        // }),
      // );
    } else {
      // dispatch(
        // modalActions.modal({
        //   component: 'LimitExceeded',
        //   title: 'Info',
        //   forceClose: true,
        //   text: defaultText,
        //   limit: questionLimit,
        //   description:
        //     profile?.subscription?.subscription_plan.code !== SubPlansCode.free
        //       ? `You have reached the limit of questions for today`
        //       : `You need to upgrade your subscription plan in order to continue using the chat`,
        // }),
      // );
    }
  };

  return { handleLimitExceeded };
};
