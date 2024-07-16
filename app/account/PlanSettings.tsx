'use client';
import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import Link from 'next/link';
import { AccountCard, AccountCardBody, AccountCardFooter } from './AccountCard';

interface PlanSettingsProps {
  stripeSubscriptionId: string | null;
  stripeCurrentPeriodEnd: Date | null;
  stripeCustomerId: string | null;
  isSubscribed: boolean | '' | null;
  isCanceled: boolean;
  id?: string;
  name?: string;
  description?: string;
  stripePriceId?: string;
  price?: number;
}
export default function PlanSettings({
  subscriptionPlan,
  session,
}: Readonly<{
  subscriptionPlan: PlanSettingsProps;
  session: Session | null;
}>) {
  return (
    <AccountCard
      params={{
        header: 'Your Plan',
        description: subscriptionPlan.isSubscribed
          ? `You are currently on the ${subscriptionPlan.name} plan.`
          : `You are not subscribed to any plan.`.concat(
              !session?.user?.email || session?.user?.email.length < 5
                ? ' Please add your email to upgrade your account.'
                : ''
            ),
      }}
    >
      <AccountCardBody>
        {subscriptionPlan.isSubscribed ? (
          <h3 className='text-lg font-semibold'>
            ${subscriptionPlan.price ? subscriptionPlan.price / 100 : 0} / month
          </h3>
        ) : null}
        {subscriptionPlan.stripeCurrentPeriodEnd ? (
          <p className='mb-4 text-sm text-muted-foreground '>
            Your plan will{' '}
            {!subscriptionPlan.isSubscribed
              ? null
              : subscriptionPlan.isCanceled
                ? 'cancel'
                : 'renew'}
            {' on '}
            <span className='font-semibold'>
              {subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString(
                'en-us'
              )}
            </span>
          </p>
        ) : null}
      </AccountCardBody>
      <AccountCardFooter description='Manage your subscription on Stripe.'>
        <Link href='/account/billing'>
          <Button variant='outline'>Go to billing</Button>
        </Link>
      </AccountCardFooter>
    </AccountCard>
  );
}
