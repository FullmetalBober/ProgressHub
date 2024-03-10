import { Metadata } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage({ params }: { params: Params }) {
  const { workspaceId } = params;

  // const cookieStore = cookies();

  // cookieStore.set('lastVisitedWorkspace', workspaceId.toString());

  return <>Dashboard</>;
}
