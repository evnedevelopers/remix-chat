import { users } from "~/utils/mocks/users";
import { IInvoice, ISubscription, ISubscriptionCoupon, ISubscriptionPlan, IUser } from "~/utils/typedefs";
import { subscriptions } from "~/utils/mocks/subscriptions";
import { subscriptionPlans } from "~/utils/mocks/subscription-plans";
import { invoices } from "~/utils/mocks/invoices";
import { subscriptionCoupons } from "~/utils/mocks/subscription-coupons";

export const findSubscriptionPlan = (planId?: string | null): ISubscriptionPlan | null => {
  const entity = subscriptionPlans.find(plan => plan.id === planId);

  if (!entity) return null;

  return Object.assign({} as ISubscriptionPlan, entity);
}

export const findSubscriptionCoupon = (couponId: string): ISubscriptionCoupon | null => {
  const entity = subscriptionCoupons.find((coupon) => coupon.uuid === couponId);

  if (!entity) return null;

  return Object.assign({} as ISubscriptionCoupon, entity);
}

export const findSubscriptionInvoice = (subscriptionId: string): IInvoice | null => {
  const invoice = invoices.find((invoice) => invoice.subscription_id === subscriptionId);

  if (!invoice) return null;

  return invoice
}

export const findUserSubscription = (userId: string): ISubscription | null => {
  const subscription = subscriptions.find((subscription) => subscription.userId === userId);

  if (!subscription) return null;

  return {
    ...subscription,
    subscription_plan: findSubscriptionPlan(subscription.subscription_plan_id)!,
    subscription_coupon: findSubscriptionCoupon(subscription.subscription_coupon_id)!,
    next_subscription_plan: findSubscriptionPlan(subscription.next_subscription_plan_id),
    invoice: findSubscriptionInvoice(subscription.uuid)!
  }
}

export const findUserProfile = (userId: string): IUser | null => {
  const user = users.find(user => user.id === userId);

  if (!user) return null;

  return {
    ...user,
    subscription: findUserSubscription(user.id)
  }
}