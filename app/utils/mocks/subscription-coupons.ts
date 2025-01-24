import { ISubscriptionCouponEntity, SubPlansCode } from "~/utils/typedefs";

export const subscriptionCoupons: ISubscriptionCouponEntity[] = [
  {
    uuid: '1',
    subscription_type: {
      code: SubPlansCode.free,
      name: "Free Plan",
      header: null,
      text_line_1: null,
      text_line_2: null,
      text_line_3: null,
      text_line_4: null,
      text_line_5: null,
      plan_limit: 10000,
      plan_visualize_limit: 10000,
      plan_metametric_limit: 10000,
      plan_visualize_minute_limit: 10000,
      plan_storyteller_prompt_limit: 10000,
      plan_storyteller_prompt_image_limit: 10000,
      plan_storyteller_limit: 10000,
      plan_tokens: "10000",
      trial_period_days: 31
    }
  }
];