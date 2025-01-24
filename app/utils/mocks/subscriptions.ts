import { ISubscriptionEntity } from "~/utils/typedefs";
import { users } from "~/utils/mocks/users";
import { subscriptionPlans } from "~/utils/mocks/subscription-plans";
import { subscriptionCoupons } from "~/utils/mocks/subscription-coupons";

export const subscriptions: ISubscriptionEntity[] = [
  {
    uuid: '1',
    paypal_subscription_id: '',
    paypal_status: null,
    limits: 1000,
    metametric_limit: 1000,
    storyteller_limit: 1000,
    visualize_limits: 1000,
    available_until: '',
    tokens: 1000,
    userId: users[0].id,
    subscription_plan_id: subscriptionPlans[0].id,
    subscription_coupon_id: subscriptionCoupons[0].uuid,
    payment_platform: null,
  },
  {
    uuid: '2',
    paypal_subscription_id: '',
    paypal_status: null,
    limits: 1000,
    metametric_limit: 1000,
    storyteller_limit: 1000,
    visualize_limits: 1000,
    available_until: '',
    tokens: 1000,
    userId: users[1].id,
    subscription_plan_id: subscriptionPlans[0].id,
    subscription_coupon_id: subscriptionCoupons[0].uuid,
    payment_platform: null,
  }
];

