import { storeSubscriptionPlans } from '@/config/subscriptions';
import prisma from '@/lib/db/index';
import { stripe } from '@/lib/stripe/index';
import { auth } from '../auth/utils';

export async function getUserSubscriptionPlan() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('User not found.');
  }

  //TODO: Fix the type of subscription
  // @ts-ignore
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!subscription)
    return {
      id: undefined,
      name: undefined,
      description: undefined,
      stripePriceId: undefined,
      price: undefined,
      stripeSubscriptionId: null,
      stripeCurrentPeriodEnd: null,
      stripeCustomerId: null,
      isSubscribed: false,
      isCanceled: false,
    };

  const isSubscribed =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd &&
    subscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

  const plan = isSubscribed
    ? storeSubscriptionPlans.find(
        plan => plan.stripePriceId === subscription.stripePriceId
      )
    : null;

  let isCanceled = false;
  if (isSubscribed && subscription.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: subscription.stripeSubscriptionId,
    stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd,
    stripeCustomerId: subscription.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}
