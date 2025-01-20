import { IUser } from "~/utils/typedefs";

export const users: IUser[] = [
  {
    id: '1',
    username: 'test1',
    password: '123456',
    fullName: 'First User',
    tokens: 1000,
    token_question_price: 10,
    token_story_price: 20,
    token_visualization_price: 10,
    on_boarding: true,
    paypal_payment_status: '',
    subscription: {
      limits: 100,
      visualize_limits: 10,
      storyteller_limit: 10,
      token_story_price: 10,
      paypal_status: '',
      subscription_plan: {
        code: 'free',
        paypal_plan_id: '',
        price: ''
      },
      subscription_coupon: {
        subscription_type: {}
      }
    },
  },
  {
    id: '2',
    username: 'test2',
    password: '123456',
    fullName: 'Second User',
    tokens: 1000,
    token_question_price: 10,
    token_story_price: 20,
    token_visualization_price: 10,
    on_boarding: true,
    paypal_payment_status: '',
    subscription: {
      limits: 50,
      visualize_limits: 10,
      storyteller_limit: 10,
      token_story_price: 10,
      paypal_status: '',
      subscription_plan: {
        code: 'free',
        paypal_plan_id: '',
        price: ''
      },
      subscription_coupon: {
        subscription_type: {}
      }
    }
  }
]