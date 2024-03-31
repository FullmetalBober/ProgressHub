import IssuesTable from '@/components/issues/IssuesTable';
import { Metadata } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const metadata: Metadata = {
  title: 'Issues',
};

export default async function DashboardPage({ params }: { params: Params }) {
  const { workspaceId } = params;

  const issues =
    (await prisma?.issue.findMany({
      where: { workspaceId },
    })) || [];

  return <IssuesTable issues={issues} />;
}
