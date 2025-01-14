import { createSelector } from 'reselect';
import { RootState } from "~/store";

export const profileSelector = (state: RootState) => state.profile;

export const getIsProfileFetching = createSelector(
  [profileSelector],
  ({ isFetching }) => {
    return isFetching;
  },
);

export const getProfileFetched = createSelector(
  [profileSelector],
  ({ isProfileFetched }) => {
    return isProfileFetched;
  },
);

export const getTokensFetched = createSelector(
  [profileSelector],
  ({ isTokensFetched }) => {
    return isTokensFetched;
  },
);

export const getProfile = createSelector([profileSelector], (result) => {
  return result.profile;
});

export const getSubscriptionStatus = createSelector(
  [profileSelector],
  (result) => {
    return result.profile?.subscription?.paypal_status?.toLowerCase() ?? '';
  },
);

export const getIsProfileUpdateDirty = createSelector(
  [profileSelector],
  (result) => {
    return result.isUserInfoDirty || result.isUserPasswordDirty;
  },
);

export const getCurrentSubscription = createSelector(
  [profileSelector],
  (result) => {
    return (
      result.profile?.subscription?.subscription_plan.paypal_plan_id ??
      result.profile?.subscription?.subscription_plan.code ??
      ''
    );
  },
);

export const getIsOnboarding = createSelector([profileSelector], (result) => {
  return result.profile?.on_boarding;
});

export const getScaleImage = createSelector([profileSelector], (result) => {
  return result.scaleImage;
});

export const getVisualizingLimit = createSelector(
  [profileSelector],
  (result) => {
    return result.profile?.subscription?.visualize_limits ?? 0;
  },
);

export const getIsShowAudioButtons = createSelector(
  [profileSelector],
  (result) => {
    return (
      result.profile?.subscription?.subscription_plan.code === SubPlansCode.free
    );
  },
);

export const getAmountOfUsers = createSelector(
  [profileSelector],
  ({ amountOfUsers }) => {
    return amountOfUsers;
  },
);

export const getPaypalPaymentStatus = createSelector(
  [profileSelector],
  ({ profile }) => {
    return profile?.paypal_payment_status ?? '';
  },
);

export const getIsVisualAdjustments = createSelector(
  [profileSelector],
  ({ profile }) => {
    return profile?.visual_adjustments ?? false;
  },
);

export const getIsShowUpdates = createSelector(
  [profileSelector],
  ({ profile }) => {
    return profile?.show_update_modal_window ?? false;
  },
);

export const getIsShowProfileTooltip = createSelector(
  [profileSelector],
  ({ showProfileTooltip }) => {
    return showProfileTooltip;
  },
);

export const getSubscriptionId = createSelector(
  [profileSelector],
  ({ profile }) => {
    return profile?.subscription?.paypal_subscription_id ?? '';
  },
);

export const getCurrentPrice = createSelector(
  [profileSelector],
  ({ profile }) => {
    if (profile?.subscription?.subscription_plan) {
      return +profile.subscription.subscription_plan.price;
    }

    return 0;
  },
);

export const getImageRegenerateImageLimit = createSelector(
  [profileSelector],
  ({ profile }) => {
    return (
      profile?.subscription?.subscription_plan
        .plan_storyteller_prompt_image_limit ?? 0
    );
  },
);

export const isStorytellerExhausted = createSelector(
  [profileSelector],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_story_price ?? 1);

    return !profile?.subscription?.storyteller_limit && !enoughTokens;
  },
);

export const getIsDatasetsOpen = createSelector(
  [profileSelector],
  ({ isDatasetsOpen }) => {
    return isDatasetsOpen;
  },
);

export const getCurrentDataset = createSelector(
  [profileSelector],
  ({ currentDataset }) => {
    return currentDataset;
  },
);

export const getIsQuestionsLimit = createSelector(
  [profileSelector],
  ({ profile }) => {
    return (
      profile?.subscription &&
      (profile.subscription.limits !== 0 || profile.tokens >= 100)
    );
  },
);

export const getIsVisualisationsLimit = createSelector(
  [profileSelector],
  ({ profile }) => {
    return (
      !!profile?.subscription && profile.subscription.visualize_limits !== 0
    );
  },
);

export const getIsStoriesLimit = createSelector(
  [profileSelector],
  ({ profile }) => {
    return (
      profile?.subscription &&
      (profile.subscription.storyteller_limit !== 0 || profile.tokens >= 100)
    );
  },
);

export const getCanDoAction = createSelector(
  [profileSelector],
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
  [profileSelector],
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
  [profileSelector],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_question_price ?? 0);

    return !profile?.subscription && enoughTokens;
  },
);

export const getCanDoStoryAction = createSelector(
  [profileSelector],
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
  [profileSelector],
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

export const getScrollTo = createSelector([profileSelector], ({ scrollTo }) => {
  return scrollTo;
});

export const getCanDoMetametricsAction = createSelector(
  [profileSelector],
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
  [profileSelector],
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
  [profileSelector],
  ({ profile }) => {
    const enoughTokens =
      (profile?.tokens ?? 0) >= (profile?.token_metametric_price ?? 0);

    return !profile?.subscription && enoughTokens;
  },
);

export const getVisualizeLimit = createSelector(
  [profileSelector],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .plan_visualize_limit;
    }

    return profile?.subscription?.subscription_plan.plan_visualize_limit ?? 0;
  },
);

export const getQuestionLimit = createSelector(
  [profileSelector],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .plan_limit;
    }

    return profile?.subscription?.subscription_plan.plan_limit ?? 0;
  },
);

export const getMetametricsLimit = createSelector(
  [profileSelector],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .plan_metametric_limit;
    }

    return profile?.subscription?.subscription_plan.plan_metametric_limit ?? 0;
  },
);

export const getStorytellerLimit = createSelector(
  [profileSelector],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .plan_storyteller_limit;
    }

    return profile?.subscription?.subscription_plan.plan_storyteller_limit ?? 0;
  },
);

export const getSubscriptionCoupon = createSelector(
  [profileSelector],
  ({ profile }) => {
    return profile?.subscription?.subscription_coupon;
  },
);

export const getVisualizeText = createSelector(
  [profileSelector],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .text_line_2;
    }

    return profile?.subscription?.subscription_plan.text_line_2 ?? '';
  },
);

export const getMetametricsText = createSelector(
  [profileSelector],
  ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return profile.subscription.subscription_coupon.subscription_type
        .text_line_4;
    }

    return profile?.subscription?.subscription_plan.text_line_4 ?? '';
  },
);

export const getStorytellerText = createSelector(
  [profileSelector],
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
  createSelector([profileSelector], ({ profile }) => {
    if (profile?.subscription?.subscription_coupon) {
      return (
        profile.subscription.subscription_coupon.subscription_type[text] ?? ''
      );
    }

    return profile?.subscription?.subscription_plan[text] ?? '';
  });
