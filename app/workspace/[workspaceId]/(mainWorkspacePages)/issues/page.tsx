import IssuesTable from '@/components/issues/IssuesTable';
import prisma from '@/lib/db/index';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Список завдань',
};

export default async function DashboardPage(
  props: Readonly<{
    params: Promise<{
      workspaceId: string;
    }>;
  }>
) {
  const params = await props.params;
  const { workspaceId } = params;

  const issues =
    (await prisma?.issue.findMany({
      where: { workspaceId },
      include: {
        assignee: true,
      },
      omit: {
        description: true,
      },
    })) || [];

  return <IssuesTable issues={issues} />;
}
