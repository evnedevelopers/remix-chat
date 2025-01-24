import { ISubscriptionPlanEntity, SubPlansCode } from "~/utils/typedefs";

export const subscriptionPlans: ISubscriptionPlanEntity[] = [
  {
    id: "1",
    code: SubPlansCode.free,
    name: "Free Plan",
    price_title: "Price per month",
    header: null,
    text_line_1: null,
    text_line_2: null,
    text_line_3: null,
    text_line_4: null,
    text_line_5: null,
    interval_unit: "1",
    plan_limit: 10000,
    plan_visualize_limit: 10000,
    plan_metametric_limit: 10000,
    plan_visualize_minute_limit: 10000,
    plan_storyteller_prompt_limit: 10000,
    plan_storyteller_prompt_image_limit: 10000,
    plan_storyteller_limit: 10000,
    price: "0",
    paypal_plan_id: null,
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toLocaleString()
  }
];