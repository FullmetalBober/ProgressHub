import IssuesTable from '@/components/issues/IssuesTable';
import prisma from '@/lib/db/index';
import type { Metadata } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const metadata: Metadata = {
  title: 'Issues',
};

export default async function DashboardPage({
  params,
}: Readonly<{ params: Params }>) {
  const { workspaceId } = params;

  const issues =
    (await prisma?.issue.findMany({
      where: { workspaceId },
      include: {
        assignee: true,
      },
    })) || [];

  return <IssuesTable issues={issues} />;
}
