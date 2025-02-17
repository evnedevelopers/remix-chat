import { createSelector } from 'reselect';

import { RootState } from "~/store";
import { SubPlansCode } from "~/utils/typedefs";

export const profileSelectors = (state: RootState) => state.profile;

export const getIsProfileFetching = createSelector(
  [profileSelectors],
  ({ isFetching }) => {
    return isFetching;
  },
);

export const getProfileFetched = createSelector(
  [profileSelectors],
  ({ isProfileFetched }) => {
    return isProfileFetched;
  },
);

export const getTokensFetched = createSelector(
  [profileSelectors],
  ({ isTokensFetched }) => {
    return isTokensFetched;
  },
);

export const getProfile = createSelector([profileSelectors], (result) => {
  return result.profile;
});

export const getSubscriptionStatus = createSelector(
  [profileSelectors],
  (result) => {
    return result.profile?.subscription?.paypal_status?.toLowerCase() ?? '';
  },
);

export const getIsProfileUpdateDirty = createSelector(
  [profileSelectors],
  (result) => {
    return result.isUserInfoDirty || result.isUserPasswordDirty;
  },
);

export const getCurrentSubscription = createSelector(
  [profileSelectors],
  (result) => {
    return (
      result.profile?.subscription?.subscription_plan.paypal_plan_id ??
      result.profile?.subscription?.subscription_plan.code ??
      ''
    );
  },
);

export const getIsOnboarding = createSelector([profileSelectors], (result) => {
  return result.profile?.on_boarding;
});

export const getScaleImage = createSelector([profileSelectors], (result) => {
  return result.scaleImage;
});

export const getVisualizingLimit = createSelector(
  [profileSelectors],
  (result) => {
    return result.profile?.subscription?.visualize_limits ?? 0;
  },
);

export const getIsShowAudioButtons = createSelector(
  [profileSelectors],
  (result) => {
    return (
      result.profile?.subscription?.subscription_plan.code === SubPlansCode.free
    );
  },
);

export const getAmountOfUsers = createSelector(
  [profileSelectors],
  ({ amountOfUsers }) => {
    return amountOfUsers;
  },
);

export const getPaypalPaymentStatus = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return profile?.paypal_payment_status ?? '';
  },
);

export const getIsVisualAdjustments = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return profile?.visual_adjustments ?? false;
  },
);

export const getIsShowUpdates = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return profile?.show_update_modal_window ?? false;
  },
);

export const getIsShowProfileTooltip = createSelector(
  [profileSelectors],
  ({ showProfileTooltip }) => {
    return showProfileTooltip;
  },
);

export const getSubscriptionId = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return profile?.subscription?.paypal_subscription_id ?? '';
  },
);

export const getCurrentPrice = createSelector(
  [profileSelectors],
  ({ profile }) => {
    if (profile?.subscription?.subscription_plan) {
      return +profile.subscription.subscription_plan.price;
    }

    return 0;
  },
);

export const getImageRegenerateImageLimit = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return (
      profile?.subscription?.subscription_plan
        .plan_storyteller_prompt_image_limit ?? 0
    );
  },
);

export const isStorytellerExhausted = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_story_price ?? 1);

    return !profile?.subscription?.storyteller_limit && !enoughTokens;
  },
);

export const getIsDatasetsOpen = createSelector(
  [profileSelectors],
  ({ isDatasetsOpen }) => {
    return isDatasetsOpen;
  },
);

export const getCurrentDataset = createSelector(
  [profileSelectors],
  ({ currentDataset }) => {
    return currentDataset;
  },
);

export const getIsQuestionsLimit = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return (
      profile?.subscription &&
      (profile.subscription.limits !== 0 || profile.tokens >= 100)
    );
  },
);

export const getIsVisualisationsLimit = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return (
      !!profile?.subscription && profile.subscription.visualize_limits !== 0
    );
  },
);

export const getIsStoriesLimit = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return (
      profile?.subscription &&
      (profile.subscription.storyteller_limit !== 0 || profile.tokens >= 100)
    );
  },
);

export const getCanDoAction = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_question_price ?? 0);

    return (
      profile?.subscription &&
      (profile.subscription.limits !== 0 || enoughTokens)
    );
  },
);

export const getShowBuyTokensModal = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_question_price ?? 0);

    return (
      profile?.subscription &&
      profile.subscription.limits === 0 &&
      !enoughTokens
    );
  },
);

export const getShowUpdatePlanToUseTokensModal = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_question_price ?? 0);

    return !profile?.subscription && enoughTokens;
  },
);

export const getCanDoStoryAction = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_story_price ?? 0);

    return (
      profile?.subscription &&
      (profile.subscription.storyteller_limit !== 0 || enoughTokens)
    );
  },
);

export const getShowBuyTokensStoryModal = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_story_price ?? 0);

    return (
      profile?.subscription &&
      profile.subscription.storyteller_limit === 0 &&
      !enoughTokens
    );
  },
);

export const getScrollTo = createSelector([profileSelectors], ({ scrollTo }) => {
  return scrollTo;
});

export const getCanDoMetametricsAction = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_metametric_price ?? 0);

    return (
      profile?.subscription &&
      (profile.subscription.metametric_limit !== 0 || enoughTokens)
    );
  },
);

export const getShowMetametricsBuyTokensModal = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_metametric_price ?? 0);

    return (
      profile?.subscription &&
      profile.subscription.metametric_limit === 0 &&
      !enoughTokens
    );
  },
);

export const getShowMetametricsUpdatePlanToUseTokensModal = createSelector(
  [profileSelectors],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_metametric_price ?? 0);

    return !profile?.subscription && enoughTokens;
  },
);

export const getVisualizeLimit = createSelector(
  [profileSelectors],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .plan_visualize_limit;
    }

    return profile?.subscription?.subscription_plan.plan_visualize_limit ?? 0;
  },
);

export const getQuestionLimit = createSelector(
  [profileSelectors],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .plan_limit;
    }

    return profile?.subscription?.subscription_plan.plan_limit ?? 0;
  },
);

export const getMetametricsLimit = createSelector(
  [profileSelectors],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .plan_metametric_limit;
    }

    return profile?.subscription?.subscription_plan.plan_metametric_limit ?? 0;
  },
);

export const getStorytellerLimit = createSelector(
  [profileSelectors],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .plan_storyteller_limit;
    }

    return profile?.subscription?.subscription_plan.plan_storyteller_limit ?? 0;
  },
);

export const getSubscriptionCoupon = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return profile?.subscription?.subscription_coupon;
  },
);

export const getVisualizeText = createSelector(
  [profileSelectors],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .text_line_2;
    }

    return profile?.subscription?.subscription_plan.text_line_2 ?? '';
  },
);

export const getMetametricsText = createSelector(
  [profileSelectors],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .text_line_4;
    }

    return profile?.subscription?.subscription_plan.text_line_4 ?? '';
  },
);

export const getStorytellerText = createSelector(
  [profileSelectors],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .text_line_3;
    }

    return profile?.subscription?.subscription_plan.text_line_3 ?? '';
  },
);

export const getText = (
  text:
    | 'text_line_1'
    | 'text_line_2'
    | 'text_line_3'
    | 'text_line_4'
    | 'text_line_5',
) =>
  createSelector([profileSelectors], ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return (
        profile.subscription.subscription_coupon.subscription_type[text] ?? ''
      );
    }

    return profile?.subscription?.subscription_plan[text] ?? '';
  });
