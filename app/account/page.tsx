import { auth, checkAuth } from '@/lib/auth/utils';
import { getUserSubscriptionPlan } from '@/lib/stripe/subscription';
import PlanSettings from './PlanSettings';
import UserSettings from './UserSettings';

export default async function Account() {
  await checkAuth();
  const session = await auth();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <main>
      <h1 className='my-4 text-2xl font-semibold'>Account</h1>
      <div className='space-y-4'>
        <PlanSettings subscriptionPlan={subscriptionPlan} session={session} />
        <UserSettings session={session} />
      </div>
    </main>
  );
}
